import { useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/auth";

function AuthSection() {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/login");
  };

  if (user === undefined) {
    return null; // ローディング中は何も表示しない
  }

  if (user === null) {
    return (
      <div className="border-b border-gray-200 p-4">
        <div className="mb-2 text-sm text-gray-500">ゲストとして表示中</div>
        <div className="flex gap-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            ログイン
          </Link>
          <Link href="/register" className="text-blue-600 hover:underline">
            新規登録
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="mb-2">
        <div className="font-bold text-gray-900">{user.name}</div>
        <div className="text-sm text-gray-500">権限: {user.plan}</div>
      </div>
      <div className="flex gap-4">
        <Link href="/mypage" className="text-blue-600 hover:underline">
          マイページ
        </Link>
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          ログアウト
        </button>
      </div>
    </div>
  );
}

export default AuthSection;
