// import { Handler } from "aws-lambda";
import { Client } from "pg";

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

async function record(client: Client, event: LorawanEvent) {
  const payload = event.uplink_message.frm_payload;
  const deveui = event.end_device_ids.dev_eui;
  // There should really only be one...right?
  const gweui = event.uplink_message.rx_metadata[0].gateway_ids.eui;
  const uplinkReceivedAt = event.uplink_message.received_at;
  const ttsReceivedAt = event.received_at;  // Time The Things Stack handled uplink message on AWS

  console.log('Performing query');
  await client.query(query, [ttsReceivedAt, uplinkReceivedAt, deveui, gweui, payload]);
}

export const handler = async function (event: LorawanEvent) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  console.log(event)

  console.log("Connecting to db");
  try {
    await client.connect();
  } catch (e) {
    throw new Error(`Error connecting to db: ${e}`);
  }

  try {
    await record(client, event);
    console.log("Query successful!");
  } catch (e) {
    throw new Error(`Error performing query: ${e}`);
  } finally {
    await client.end();
  }
};
