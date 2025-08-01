import { GraphQLClient } from "graphql-request";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";

export const graphql = new GraphQLClient(`${NEXT_PUBLIC_BACKEND_URL}/graphql`, {
  credentials: "include",
});
