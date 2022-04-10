// import { Handler } from "aws-lambda";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { decodeCayenne } from "./cayenne";

// Expects PG env vars

/* Expects TTN format (must have the minimum here):
  {
  "end_device_ids": {
    "device_id": "eui-70b3d57ed004c738",
    "application_ids": {
      "application_id": "aether"
    },
    "dev_eui": "70B3D57ED004C738",
    "dev_addr": "260C2726"
  },
  "received_at": "2022-02-10T00:06:34.716643802Z",
  "uplink_message": {
    "f_port": 2,
    "f_cnt": 342,
    "frm_payload": "aGk=",
    "rx_metadata": [
      {
        "gateway_ids": {
          "gateway_id": "paul-indoor",
          "eui": "58A0CBFFFE803908"
        },
        "time": "2022-02-10T00:06:34.510133028Z",
        "rssi": -33,
        "channel_rssi": -33,
        "snr": 9.25,
      }
    ],
    "settings": {
      "data_rate": {
        "lora": {
          "bandwidth": 125000,
          "spreading_factor": 7
        }
      },
      "coding_rate": "4/5",
      "frequency": "902900000",
      "timestamp": 3414485315,
      "time": "2022-02-10T00:06:34.510133028Z"
    },
    "received_at": "2022-02-10T00:06:34.509579343Z",
    "confirmed": true,
    "consumed_airtime": "0.046336s",
  }
}
  * */

interface LorawanEvent {
  end_device_ids: {
    device_id: string;
    application_ids: {
      application_id: string;
    };
    dev_eui: string;
    dev_addr: string;
  };
  received_at: string;
  uplink_message: {
    f_port: number;
    f_cnt: number;
    frm_payload: string;
    rx_metadata: Array<{
      gateway_ids: {
        gateway_id: string;
        eui: string;
      };
      time: string;
      rssi: number;
      channel_rssi: number;
      snr: number;
    }>;
    settings: {
      data_rate: {
        lora: {
          bandwidth: number;
          spreading_factor: number;
        };
      };
      coding_rate: string;
      frequency: string;
      timestamp: number;
      time: string;
    };
    received_at: string;
    confirmed: boolean;
    consumed_airtime: string;
  }
}

async function record(supabase: SupabaseClient, event: LorawanEvent) {
  const payload = event.uplink_message.frm_payload;
  const deveui = event.end_device_ids.dev_eui;
  // There should really only be one...right?
  // const gweui = event.uplink_message.rx_metadata[0].gateway_ids.eui;
  const uplinkReceivedAt = event.uplink_message.received_at;
  // const ttsReceivedAt = event.received_at;  // Time The Things Stack handled uplink message on AWS

  const base64Decoded = Buffer.from(payload, 'base64');
  const readings = decodeCayenne(base64Decoded);

  console.log(`Got readings: ${JSON.stringify(readings)}`);

  const res = await Promise.allSettled(readings.map(async (reading, index) => {
    console.log(reading);
    console.log(deveui);
    const { data, error } = await supabase.rpc('new_reading', {
      dev_eui: deveui,
      sensor_channel: reading.type,
      at: uplinkReceivedAt,
      value: reading.value,
    });

    if (error) {
      return Promise.reject(`Error when adding new reading="${JSON.stringify(reading)}, index=${index}: ${JSON.stringify(error)}`);
    }
    else {
      console.log('Successfully added new reading:');
      console.log(data);
      return Promise.resolve(data);
    }
  }));

  return {
    data: res.filter(p => p.status === 'fulfilled'),
    errors: res.filter(p => p.status === 'rejected'),
  };
}

export const handler = async function(event: LorawanEvent) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  console.log(await supabase.from('device').select('*'));

  const { errors } = await record(supabase, event);

  if (errors.length > 0) {
    throw new Error('Errors while recording reading(s): ' + JSON.stringify(errors, undefined, 2));
  }
};
