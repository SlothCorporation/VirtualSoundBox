import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";

export const getCsrfToken = async () => {
  await fetch(`${NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
};
