import { handler } from "./index";
import * as testJson from "./test.json";

handler(testJson)
  .then(() => console.log('Success'))
  .catch((e) => console.log(`Error: ${e}`));
