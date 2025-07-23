import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { getCsrfToken } from "@/lib/auth";

const getXsrfTokenFromCookie = (): string => {
  return decodeURIComponent(
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1] || "",
  );
};

export const apiFetch = async (
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> => {
  await getCsrfToken();
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

  // 419: Token expired or invalid → 再取得して再試行
  if (res.status === 419 && retry) {
    console.warn("CSRF token expired, retrying...");

    // 古いトークンを削除（有効期限を過去に）
    document.cookie = "XSRF-TOKEN=; Path=/; Max-Age=0; SameSite=Lax; Secure";

    // トークン再取得して再試行（retry=false でループ防止）
    return apiFetch(path, options, false);
  }

  return res;
};

export const apiFetchFormData = async (
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<Response> => {
  await getCsrfToken();
  const xsrfToken = getXsrfTokenFromCookie();

  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${path}`, {
    credentials: "include",
    headers: {
      // "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
      ...(options.headers || {}),
    },
    ...options,
  });

  // 419: Token expired or invalid → 再取得して再試行
  if (res.status === 419 && retry) {
    console.warn("CSRF token expired, retrying...");

    // 古いトークンを削除（有効期限を過去に）
    document.cookie = "XSRF-TOKEN=; Path=/; Max-Age=0; SameSite=Lax; Secure";

    // トークン再取得して再試行（retry=false でループ防止）
    return apiFetch(path, options, false);
  }

  return res;
};
