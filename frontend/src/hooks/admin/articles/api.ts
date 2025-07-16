import { apiFetch } from "@/lib/api";
import type { EditorArticle } from "@/atoms/editorArticleAtom";

type FetchArticlesPagination = {
  page: number;
};

export const fetchArticlesPagination = async ({
  page,
}: FetchArticlesPagination) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("per_page", "20");
  const response = await apiFetch(`/api/admin/articles?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Articles");
  }
  return await response.json();
};

export const fetchArticle = async (id: string) => {
  const response = await apiFetch(`/api/admin/articles/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Article");
  }
  return await response.json();
};

export const saveEditorArticle = async (article: EditorArticle) => {
  const payload = {
    title: article.title,
    content_type: article.contentType,
    external_url: article.externalUrl,
    external_description: article.externalDescription,
    body: article.body,
    tags: article.tags,
    category: article.category ?? null,
  };

  if (article.id === null) {
    const response = await apiFetch("/api/admin/articles", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.json();
  } else {
    const response = await apiFetch(`/api/admin/articles/${article.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return response.json();
  }
};

export const updatePublishSetting = async (id: string) => {
  const response = await apiFetch(`/api/admin/articles/${id}/toggle-publish`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Update to status Article");
  }
  return await response.json();
};
