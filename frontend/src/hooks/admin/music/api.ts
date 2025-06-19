import { apiFetch } from "@/lib/api";

type FetchMusicPaginationProps = {
  keyword: string;
  page: number;
};

export const fetchMusicsPagination = async ({
  keyword,
  page,
}: FetchMusicPaginationProps) => {
  const response = await apiFetch(
    `/api/admin/music?page=${page}&per_page=50&keyword=${keyword}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch music");
  }
  return await response.json();
};

type UpdateMusicProps = {
  name: string;
  artist: string;
};

export const updateMusic = async (id: number, data: UpdateMusicProps) => {
  const response = await apiFetch(`/api/admin/music/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update music");
  }
  return await response.json();
};

export const deleteMusic = async (id: number) => {
  const response = await apiFetch(`/api/admin/music/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete music");
  }
  return await response.json();
};
