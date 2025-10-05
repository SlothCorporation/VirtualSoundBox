import { useMutation } from "@tanstack/react-query";
import type { ContactInput } from "@/generated/graphql";
import { sdk } from "@/lib/graphql-client";

export const useSendContact = () => {
  const { error, ...rest } = useMutation({
    mutationKey: ["sendContact"],
    mutationFn: (input: ContactInput) => sdk.sendContact({ input }),
  });

  if (error) {
    return { error: error.message, ...rest };
  }

  return { error: null, ...rest };
};
