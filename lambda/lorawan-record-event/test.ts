import { handler } from "./main";

const req = JSON.parse(`
  {
  "end_device_ids": {
    "device_id": "eui-70b3d57ed004c738",
    "application_ids": {
      "application_id": "aether"
    },
    "dev_eui": "70B3D57ED004C738",
    "dev_addr": "260C2726"
  },
  "correlation_ids": [
    "as:up:01FVGPAJEEJNV3WK66Y8BG2BT1",
    "gs:conn:01FVG7WP3RW5J093T49KGYYRRH",
    "gs:up:host:01FVG7WP8M8CNSNQGJ6CTZDPAG",
    "gs:uplink:01FVGPAJ6Z7JY58J9XXTJ5FESS",
    "ns:uplink:01FVGPAJ72HQX3BGREWNRCDJKK",
    "rpc:/ttn.lorawan.v3.GsNs/HandleUplink:01FVGPAJ72FKANEZMTFV82R70Q",
    "rpc:/ttn.lorawan.v3.NsAs/HandleUplink:01FVGPAJDTA1XF5XMV0JNTT2GE"
  ],
  "received_at": "2022-02-10T02:10:18.794386357Z",
  "uplink_message": {
    "f_port": 2,
    "f_cnt": 757,
    "frm_payload": "aGk=",
    "rx_metadata": [
      {
        "gateway_ids": {
          "gateway_id": "paul-indoor",
          "eui": "58A0CBFFFE803908"
        },
        "time": "2022-02-10T02:10:18.545696973Z",
        "timestamp": 2248510699,
        "rssi": -36,
        "channel_rssi": -36,
        "snr": 7,
        "uplink_token": "ChkKFwoLcGF1bC1pbmRvb3ISCFigy//+gDkIEOuZlrAIGgwIiuiRkAYQz5eQ3QEg+Ou5rbi4AyoMCIrokZAGEM3ZmoQC"
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
      "frequency": "902700000",
      "timestamp": 2248510699,
      "time": "2022-02-10T02:10:18.545696973Z"
    },
    "received_at": "2022-02-10T02:10:18.466709614Z",
    "confirmed": true,
    "consumed_airtime": "0.046336s",
    "network_ids": {
      "net_id": "000013",
      "tenant_id": "ttn",
      "cluster_id": "ttn-nam1"
    }
  }
}
`);

handler(req);
