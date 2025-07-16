// components/editor/sidebar/StatusPanel.tsx
import React, { useState } from "react";
import { SidebarPanel } from "./SidebarPanel";
import { editorArticleAtom } from "@/atoms/editorArticleAtom";
import { useAtom } from "jotai";
import {
  saveEditorArticle,
  updatePublishSetting,
} from "@/hooks/admin/articles/api";
import { Toast } from "@/components/Toast/Toast";

const articleStatus = {
  draft: "下書き",
  published: "公開済み",
  scheduled: "公開予約",
  unpublished: "非公開",
};

export const StatusPanel = () => {
  const [article, setArticle] = useAtom(editorArticleAtom);
  const [scheduledAt, setScheduledAt] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveDraft = async () => {
    await saveEditorArticle(article);
    Toast({
      title: "保存成功",
      description: "記事が下書きとして保存されました。",
    });
  };

  const handlePreview = () => {
    console.log("プレビュー");
  };

  const handleTogglePublish = async () => {
    if (!article.id) return;

    try {
      setLoading(true);
      const res = await updatePublishSetting(String(article.id));
      setArticle({
        ...article,
        status: res.status,
        publishAt: res.publish_at,
      });

      Toast({
        title: "ステータス更新",
        description: `記事を「${articleStatus[res.status]}」に更新しました。`,
      });
    } catch (error) {
      console.error(error);
      Toast({
        title: "エラー",
        description: "公開状態の更新に失敗しました。",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleConfirm = () => {
    setShowScheduleModal(false);
  };

  return (
    <SidebarPanel title="公開ステータス">
      <div className="space-y-2">
        <div className="flex justify-between">
          <button
            onClick={handleSaveDraft}
            className="rounded border px-3 py-1 text-sm"
          >
            下書きとして保存
          </button>
          <button
            onClick={handlePreview}
            className="rounded border px-3 py-1 text-sm"
          >
            プレビュー
          </button>
        </div>

        <div className="flex items-center text-sm">
          <span className="text-gray-600">ステータス</span>
          <span className="ml-auto w-1/2 text-right text-gray-800">
            {articleStatus[article.status] || "未設定"}
          </span>
        </div>

        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">公開予約</span>
            {scheduledAt ? (
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowScheduleModal(true)}
              >
                編集
              </button>
            ) : (
              <button
                onClick={() => setShowScheduleModal(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                設定する
              </button>
            )}
          </div>
          {scheduledAt && (
            <div className="flex items-center text-sm">
              <span className="text-gray-600">公開予定日</span>
              <span className="ml-auto w-1/2 text-right text-gray-800">
                {scheduledAt.replace("T", " ")}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleTogglePublish}
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
        >
          {article.status === "published" ? "非公開にする" : "公開する"}
        </button>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">公開予約日時を設定</h2>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mb-4 w-full rounded border px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="rounded border px-4 py-2"
              >
                キャンセル
              </button>
              <button
                onClick={handleScheduleConfirm}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                設定
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarPanel>
  );
};
