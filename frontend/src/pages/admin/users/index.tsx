import AdminLayout from "@/components/AdminLayout";
import { fetchUsers } from "@/hooks/admin/users/api";
import { useEffect, useState } from "react";
import Link from "next/link";

function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("ユーザーの取得に失敗しました", error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">ユーザー一覧</h1>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">名前</th>
                  <th className="border px-4 py-2">メール</th>
                  <th className="border px-4 py-2">プラン</th>
                  <th className="border px-4 py-2">管理者</th>
                  <th className="border px-4 py-2">登録日時</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">
                      <Link
                        href={`/admin/users/${user.uuid}`}
                        className="text-blue-600 underline"
                      >
                        {user.id}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.plan}</td>
                    <td className="border px-4 py-2">
                      {user.admin_flg ? "有効" : "無効"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Page;
