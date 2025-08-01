import { GraphQLClient } from "graphql-request";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { getSdk } from "@/generated/graphql";

const client = new GraphQLClient(`${NEXT_PUBLIC_BACKEND_URL}/graphql`, {
  credentials: "include",
});

export const sdk = getSdk(client);
