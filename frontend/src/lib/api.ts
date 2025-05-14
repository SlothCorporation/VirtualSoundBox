import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { getCsrfToken } from "@/lib/auth";

export const apiFetch = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  await getCsrfToken();
  const xsrfToken = decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || "",
  );

  return fetch(`${NEXT_PUBLIC_BACKEND_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      ...(options.headers || {}),
    },
    ...options,
  });
};
