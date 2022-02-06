import express from "express";
import postgraphile from "postgraphile";
import shortenRowPlugin from "./src/plugins/pg-shorten-all-rows-inflector";

const app = express();
const PORT = process.env.PORT || 3000;

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

console.log(`Listing on port ${PORT}`);
app.listen(PORT);
