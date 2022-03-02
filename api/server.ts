import cors from "cors";
import express, { NextFunction, Response } from "express";
import postgraphile, { PostGraphileOptions } from "postgraphile";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import PostgisPlugin from "@graphile/postgis";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import * as jwt from "jsonwebtoken";

const secretJwt = process.env.SUPABASE_SECRET_JWT;
if (!secretJwt) throw new Error('SUPABASE_SECRET_JWT not defined');

function supabaseAuth(req: any, res: Response, next: NextFunction) {
  const auth: string = req.headers.authorization ?? '';
  console.log(req.headers);
  console.log(`auth: ${auth}`);

  if (auth) {
    const authSplit = auth.trim().split(' ');
    if (authSplit.length == 2) {
      const token = authSplit[1];
      console.log('token=' + token);
      const decoded = jwt.verify(token, secretJwt);
      console.log(decoded);
      req.jwtClaims = decoded;
    }
  }
  else {
    req.jwtClaims = {}
  }

  next();
}

const app = express();
const PORT = process.env.PORT || 4000;

const postgraphileConfig: PostGraphileOptions = {
  appendPlugins: [
    PgSimplifyInflectorPlugin,
    PostgisPlugin,
    ConnectionFilterPlugin,
  ],
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  // https://github.com/supabase/supabase/discussions/1057#discussioncomment-1729963
  pgSettings: (req) => {
    let jwtClaims = (req as any).jwtClaims;
    console.log(jwtClaims);
    jwtClaims = jwtClaims.sub && jwtClaims.email && jwtClaims.role ? jwtClaims : null;

    if (!jwtClaims) return {};

    return {
      role: jwtClaims ? jwtClaims.role : "anon",
      ["request.jwt.claim.sub"]: jwtClaims.sub,
      ["request.jwt.claim.email"]: jwtClaims.email,
      ["request.jwt.claim.role"]: jwtClaims.role,
    }
  }
}

app.use(supabaseAuth);
app.use(cors());
app.use(
  postgraphile(process.env.DATABASE_URL, "public", postgraphileConfig)
);

// This is for AWS ec2 health checks
app.get("/", (_, res) => {
  res.status(200).send("HEALTH CHECK: OK");
});

console.log(`Listing on port ${PORT}`);
app.listen(PORT);
