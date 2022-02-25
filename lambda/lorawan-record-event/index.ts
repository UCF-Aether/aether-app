// import { Handler } from "aws-lambda";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Expects PG env vars

const query = `INSERT INTO devmsgs(time, rcvd, deveui, gweui, payload) VALUES ($1, $2, $3, $4, $5);`;

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
  received_at: Date;
  uplink_message: {
    f_port: number;
    f_cnt: number;
    frm_payload: string;
    rx_metadata: [{
      gateway_ids: {
        gateway_id: string;
        eui: string;
      };
      time: Date;
      rssi: number;
      channel_rssi: number;
      snr: number;
    }];
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
      time: Date;
    };
    received_at: Date;
    confirmed: boolean;
    consumed_airtime: string;
  }
}

const cayenneChannels = {
  0: 'BME688',
  1: 'ZMOD4510',
  2: 'SPS30'
};


const cayenneDataMappings = {
  0: {
    type: 'TEMPERATURE',
    bytes: 8,
  },
  1: {
    type: 'PRESSURE',
    bytes: 8,
  },
  2: {
    type: 'REL_HUMIDITY',
    bytes: 8,
  },
  3: {
    type: 'GAS_RES',
    bytes: 8,
  },
  4: {
    type: 'FAST_AQI',
    bytes: 1,
  },
  5: {
    type: 'AQI',
    bytes: 1,
  },
  6: {
    type: 'O3',
    bytes: 8,
  },
};

interface Reading {
  chan: string;
  value: number;
}

// Should already be base64 decoded
function decodeCayenne(payloadBuf: Buffer): Array<Reading> {
  const readings: Array<Reading> = [];
  let chan: string;
  let dataType: string;
  let dataSize: number;
  let dataDecodeStart: number = 0;
  let value: number = 0;
  // Decode state
  // 0: decoding channel
  //    1 byte
  // 1: decoding data type
  //    1 byte
  // 2: decoding sensor reading (data)
  //    N bytes, specified by cayenneDataMappings.
  //    Numbers are assumed to be big-endian and are shifted into `value`.
  // otherwise: error
  let state: number = 0;

  console.log(`Got cayenna packet: "${payloadBuf.toString()}"`)
  payloadBuf.forEach((bufByte, index) => {
    switch (state) {
      case 0: {
        // Decoding the sensor channel - which sensor from the device
        chan = cayenneChannels[bufByte];
        if (!chan) throw new Error('Unknown cayenne channel: ' + bufByte);
        state = 1;
      }

      case 1: {
        // Decoding the sensor reading data type
        dataType = cayenneDataMappings[bufByte].type;
        dataSize = cayenneDataMappings[bufByte].bytes;
        if (dataType == undefined || dataType == null) throw new Error('Unknown data type: ' + bufByte);
        if (dataSize == undefined || dataSize == null) throw new Error('Unknown data type: ' + bufByte);

        state = 2;
        dataDecodeStart = index + 1;
        value = 0;
      }

      case 2: {
        // Decoding the sensor reading value
        value = bufByte << (dataSize - (index - dataDecodeStart));

        if (dataSize === dataSize - index + dataDecodeStart + 1) {
          // Done with decoding the reading
          readings.push({ chan, value });
          state = 0;
        }
      }

      default: throw new Error(`Unknown cayenne decode state: ${state}. buf=${payloadBuf}, chan=${chan}, value=${value} byte=${bufByte}`);
    }
  });

  return readings;
}

async function record(supabase: SupabaseClient, event: LorawanEvent) {
  const payload = event.uplink_message.frm_payload;
  const deveui = event.end_device_ids.dev_eui;
  // There should really only be one...right?
  const gweui = event.uplink_message.rx_metadata[0].gateway_ids.eui;
  const uplinkReceivedAt = event.uplink_message.received_at;
  const ttsReceivedAt = event.received_at;  // Time The Things Stack handled uplink message on AWS

  try {
    const base64Decoded = Buffer.from(payload, 'base64');
    const readings = decodeCayenne(base64Decoded);

    readings.forEach(reading => {
      supabase.rpc('new_reading', {
        dev_eui: deveui,
        sensor_channel: reading.chan,
        at: uplinkReceivedAt,
        value: reading.value,
      });
    })
  }
  catch (err) {
    // Still store it, but TODO: issue some other kind of error/warning
  }
}

export const handler = async function(event: LorawanEvent) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );

  try {
    await record(supabase, event);
    console.log("Record successful!");
  } catch (e) {
    throw new Error(`Error performing query: ${e}`);
  }
};
