import { Handler } from "aws-lambda";
import { Client } from "pg";

// Expects PG env vars

const query = `INSERT INTO devmsgs(time, rcvd, deveui, gweui, payload) VALUES (NOW(), $1, $2, $3, $4);`;

export const handler: Handler = async function (event, context) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  console.log(event);

  const loraMeta = event.WirelessMetadata.LoRaWAN;
  const gateways = event.WirelessMetadata.LoRaWAN.Gateways;

  const payload = event.PayloadData;
  const deveui = loraMeta.DevEui;
  // There should really only be one...right?
  const gweui = gateways[0].GatewayEui;
  const timestamp = loraMeta.Timestamp;

  console.log("Connecting to db");
  let res;

  try {
    await client.connect();
  } catch (e) {
    return { message: `Error connecting to db: ${e}`, status: 1 };
  }

  try {
    await client.query(query, [timestamp, deveui, gweui, payload]);
    res = { message: "Query successful!", status: 0 };
  } catch (e) {
    res = { message: `Error performing query: ${e}`, status: 2 };
  }

  await client.end();

  return res;
};
