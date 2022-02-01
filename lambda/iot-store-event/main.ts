import { Handler } from "aws-lambda";
import { Client } from "pg";

// Expects PG env vars
const client = new Client();

export const handler: Handler = async function(event, context) {
  console.log(event);
  
  var gateways = event.WirelessMetadata.LoRaWAN.Gateways;
  gateways.forEach(function(gateway: object) {
      console.log(gateway);
  });

  console.log(`Payload: ${event.PayloadData}`);

  console.log("Connecting to db");
  await client.connect();
  client
    .query("SELECT NOW() as now")
    .then(res => console.log(JSON.stringify(res)))
    .catch(e => console.log(JSON.stringify(e)));
  
  return {
    "javascript": "is making me question my sanity",
  };
}