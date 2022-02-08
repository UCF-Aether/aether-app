import express from "express";
import cors from "cors";
import postgraphile from "postgraphile";
import shortenRowPlugin from "./src/plugins/pg-shorten-all-rows-inflector";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    appendPlugins: [
      shortenRowPlugin,
    ],
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

// This is for AWS ec2 health checks
app.get("/", (_, res) => {
  res.status(200).send("HEALTH CHECK: OK");
});

console.log(`Listing on port ${PORT}`);
app.listen(PORT);
