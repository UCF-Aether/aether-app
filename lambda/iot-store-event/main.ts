import { Handler } from "aws-lambda";
import { Client } from "pg";

// Expects PG env vars
const client = new Client();

const query = `INSERT INTO devmsgs(time, rcvd, deveui, gweui, payload) VALUES (NOW(), $1, $2, $3, $4);`;

export const handler: Handler = async function(event, context) {
  console.log(event);
  
  const loraMeta = event.WirelessMetadata.LoRaWAN; 
  const gateways = event.WirelessMetadata.LoRaWAN.Gateways;
  gateways.forEach(function(gateway: object) {
    console.log(gateway);
  });

  const payload = event.PayloadData;
  console.log(`Payload: ${payload}`);
  const deveui = loraMeta.DevEui;
  // There should really only be one...right?
  const gweui = gateways[0].GatewayEui;
  const timestamp = loraMeta.Timestamp;

  console.log("Connecting to db");
  await client.connect().catch(e => console.log(e));
  client
    .query("SELECT NOW() as now")
    .then(res => console.log(JSON.stringify(res)))
    .catch(e => console.log(JSON.stringify(e)));

  console.log("Inserting event data into db");
  const res = await client.query(query, [timestamp, deveui, gweui, payload])
  console.log(res);
  
  await client.end();
  return {
    "javascript": "is making me question my sanity",
  };
}
