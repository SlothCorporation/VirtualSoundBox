import { apiFetch } from "@/lib/api";

export type Tag = {
  id: number;
  name: string;
  slug: string;
  count: number;
  created_at: string;
  updated_at: string;
};

type FetchTagsPaginationProps = {
  keyword: string;
  page: number;
};

export const fetchTags = async () => {
  const response = await apiFetch("/api/admin/tags/all");

  return await response.json();
};

export const fetchTagsPagination = async ({
  keyword,
  page,
}: FetchTagsPaginationProps) => {
  const response = await apiFetch(
    `/api/admin/tags?page=${page}&per_page=20&keyword=${keyword}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  return await response.json();
};

type UpdateTagProps = {
  name: string;
};

export const updateTag = async (id: number, data: UpdateTagProps) => {
  const response = await apiFetch(`/api/admin/tags/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update tag");
  }
  return await response.json();
};

export const deleteTag = async (id: number) => {
  const response = await apiFetch(`/api/admin/tags/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete tag");
  }
  return await response.json();
};
