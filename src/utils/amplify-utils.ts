import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { Schema } from "../../amplify/data/resource";
import config from "@/../amplifyconfiguration.json";
import { cookies } from "next/headers";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: "userPool",
});
