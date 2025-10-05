import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env-client";
import { apiFetch } from "@/lib/api";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
};

export const getCsrfToken = async () => {
  await fetch(`${NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
};

export const logout = async (): Promise<void> => {
  try {
    await apiFetch("/api/logout", { method: "POST" });
  } catch (e) {
    console.error("logout failed:", e);
  }

  deleteCookie("XSRF-TOKEN");
  deleteCookie("laravel_session");
};
