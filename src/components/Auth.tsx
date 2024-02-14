"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration.json";
Amplify.configure(config, { ssr: true });

export default function Auth({ children }: { children: React.ReactNode }) {
  return <Authenticator>{children}</Authenticator>;
}
