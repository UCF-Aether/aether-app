import { Handler } from "aws-lambda";

export const main: Handler = async function(event, context) {
  console.log(event);
  var gateways = event.WirelessMetadata.LoRaWAN.Gateways;
  gateways.forEach(function(gateway: object) {
      console.log(gateway);
  });

  console.log(`Payload: ${event.PayloadData}`);
}