// import { Handler } from "aws-lambda";
import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";
import { TextEncoder } from "util";

const NUM_RETRIES = 3;

interface TTSLorawanEvent {
  type: "AWS";
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
    rx_metadata: {
      gateway_ids: {
        gateway_id?: string;
        eui: string;
      };
      time?: Date;
      rssi: number;
      channel_rssi?: number;
      snr: number;
    }[];
    settings: {
      data_rate: {
        lora: {
          bandwidth: number;
          spreading_factor: number;
        };
      };
      coding_rate: string;
      frequency: string;
      timestamp?: number;
      time?: Date;
    };
    received_at: Date;
    confirmed: boolean;
    consumed_airtime: string;
  };
}

interface AWSLorawanEvent {
  WirelessDeviceId: string;
  PayloadData: string;
  WirelessMetadata: {
    LoRaWAN: {
      ADR: boolean;
      Bandwidth: number;
      ClassB: boolean;
      CodeRate: string;
      DataRate: string;
      DevAddr: string;
      DevEui: string;
      FCnt: number;
      FOptLen: number;
      FPort: number;
      Frequency: string;
      Gateways: {
        GatewayEui: string;
        Rssi: number;
        Snr: number;
      }[];
      MIC: string;
      MType: string;
      Major: string;
      Modulation: string;
      PolarizationInversion: boolean;
      SpreadingFactor: number;
      Timestamp: string;
    };
  };
}

export const handler = async function (event: AWSLorawanEvent) {
  const tts: TTSLorawanEvent = {
    type: "AWS",
    end_device_ids: {
      device_id: event.WirelessDeviceId,
      application_ids: {
        application_id: "aether",
      },
      dev_eui: event.WirelessMetadata.LoRaWAN.DevEui,
      dev_addr: event.WirelessMetadata.LoRaWAN.DevAddr,
    },
    received_at: new Date(), // Time processed by LNS (AWS)
    uplink_message: {
      f_port: event.WirelessMetadata.LoRaWAN.FPort,
      f_cnt: event.WirelessMetadata.LoRaWAN.FCnt,
      frm_payload: event.PayloadData,
      rx_metadata: event.WirelessMetadata.LoRaWAN.Gateways.map((g) => {
        return {
          gateway_ids: {
            eui: g.GatewayEui,
          },
          rssi: g.Rssi,
          snr: g.Snr,
        };
      }),
      settings: {
        data_rate: {
          lora: {
            bandwidth: event.WirelessMetadata.LoRaWAN.Bandwidth,
            spreading_factor: event.WirelessMetadata.LoRaWAN.SpreadingFactor,
          },
        },
        coding_rate: event.WirelessMetadata.LoRaWAN.CodeRate,
        frequency: event.WirelessMetadata.LoRaWAN.Frequency,
      },
      received_at: new Date(event.WirelessMetadata.LoRaWAN.Timestamp),
      confirmed: event.WirelessMetadata.LoRaWAN.MType !== "UnconfirmedDataUp",
      consumed_airtime: "-1",
    },
  };

  const client = new IoTDataPlaneClient({
    region: "us-east-1",
  });

  const topic = `lorawan/${event.WirelessMetadata.LoRaWAN.DevEui.toUpperCase()}/uplink`;
  const encoder = new TextEncoder();
  const command = new PublishCommand({
    payload: encoder.encode(JSON.stringify(tts)),
    topic: topic,
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  for (let i = 0; i < NUM_RETRIES; i += 1) {
    try {
      const response = await client.send(command);
      console.log(`Published ${tts} to ${topic} with response ${response}`);
      return;
    } catch (e) {
      const retryDelay = [2, 4, 8][i]; 
      console.log(`Error publishing to ${topic} topic: ${e}`);
      console.log(`Trying again in ${retryDelay} seconds...`);
      await delay(retryDelay * 1000);
    }
  }

  throw new Error(`Failed publishing to MQTT topic ${topic} after ${NUM_RETRIES} retries!`);
};
