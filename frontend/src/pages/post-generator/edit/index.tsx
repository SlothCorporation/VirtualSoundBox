import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createTemplate, fetchTemplates } from "@/hooks/postGenerator/api";

function Page() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    setLoading(true);
    try {
      await createTemplate();
      await loadTemplates();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">テンプレート一覧</h1>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="flex flex-col gap-4 overflow-x-auto">
            <div className="flex justify-end">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white"
                onClick={handleCreateTemplate}
                disabled={loading || templates.length >= 3}
              >
                作成
              </button>
            </div>
            <table className="min-w-full border border-gray-300 text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">テンプレート名</th>
                  <th className="border px-4 py-2">タイプ</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.uuid}>
                    <td className="border px-4 py-2">
                      <Link
                        href={`/post-generator/edit/${template.uuid}`}
                        className="text-blue-600 underline"
                      >
                        {template.name}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      {template.type === "music"
                        ? "楽曲テンプレート"
                        : "セトリテンプレート"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4">
          <Link href="/post-generator" className="text-blue-600 underline">
            {"< 戻る"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
