import { apiFetch } from "@/lib/api";

export const fetchUsers = async () => {
  const response = await apiFetch("/api/admin/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

export const fetchUser = async (userUuid: string) => {
  const response = await apiFetch(`/api/admin/users/${userUuid}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return await response.json();
};

type UserData = {
  name: string;
  email: string;
  plan: "free" | "premium";
  admin_flg: "0" | "1";
};

export const updateUser = async (userUuid: string, data: UserData) => {
  const response = await apiFetch(`/api/admin/users/${userUuid}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return await response.json();
};
