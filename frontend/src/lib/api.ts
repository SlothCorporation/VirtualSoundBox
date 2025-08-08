import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { getCsrfToken } from "@/lib/auth";

let csrfTokenFetched = false;

const getXsrfTokenFromCookie = (): string => {
  return decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || "",
  );
};

const ensureCsrfToken = async (): Promise<void> => {
  if (!csrfTokenFetched) {
    await getCsrfToken();
    csrfTokenFetched = true;
  }
};

export const apiFetch = async (
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> => {
  await ensureCsrfToken();
  const xsrfToken = getXsrfTokenFromCookie();

  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      ...(options.headers || {}),
    },
    ...options,
  });

  if (res.status === 419 && retry) {
    console.warn("CSRF token expired, retrying...");
    document.cookie = "XSRF-TOKEN=; Path=/; Max-Age=0; SameSite=Lax; Secure";
    csrfTokenFetched = false; // トークン再取得を許可
    return apiFetch(path, options, false);
  }

  return res;
};

export const apiFetchFormData = async (
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> => {
  await ensureCsrfToken();
  const xsrfToken = getXsrfTokenFromCookie();

  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${path}`, {
    credentials: "include",
    headers: {
      "X-XSRF-TOKEN": xsrfToken,
      ...(options.headers || {}),
    },
    ...options,
  });

  if (res.status === 419 && retry) {
    console.warn("CSRF token expired, retrying...");
    document.cookie = "XSRF-TOKEN=; Path=/; Max-Age=0; SameSite=Lax; Secure";
    csrfTokenFetched = false; // トークン再取得を許可
    return apiFetchFormData(path, options, false);
  }

  return res;
};
