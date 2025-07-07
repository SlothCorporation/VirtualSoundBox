import { apiFetch } from "@/lib/api";
import type { Category as CategoryInput } from "@/schema/admin/category";

export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  created_at: string;
  updated_at: string;
};

export const fetchCategory = async () => {
  const response = await apiFetch("/api/admin/category");
  if (!response.ok) {
    throw new Error("Failed to fetch Category");
  }
  return await response.json();
};

export const createCategory = async (data: CategoryInput) => {
  const response = await apiFetch("/api/admin/category", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create Category");
  }
  return await response.json();
};

export const deleteCategory = async (id: string) => {
  const response = await apiFetch(`/api/admin/category/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete Category");
  }
  return await response.json();
};
