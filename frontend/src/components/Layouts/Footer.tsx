import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 text-sm md:grid-cols-4">
        {/* サイト情報 */}
        <div>
          <h2 className="mb-4 text-lg font-bold">VirtualSoundBox</h2>
          <p className="text-gray-400">
            音楽と出会う、エンタメを楽しむニュースサイト
          </p>
        </div>

        {/* ナビゲーション */}
        <div>
          <h3 className="mb-3 font-semibold">ナビゲーション</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/">ホーム</Link>
            </li>
            <li>
              <Link href="/articles">記事一覧</Link>
            </li>
          </ul>
        </div>

        {/* カテゴリ */}
        <div>
          <h3 className="mb-3 font-semibold">カテゴリ</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/articles/category/music">楽曲</Link>
            </li>
            <li>
              <Link href="/articles/category/artist">アーティスト</Link>
            </li>
            <li>
              <Link href="/articles/category/event">イベント</Link>
            </li>
          </ul>
        </div>

        {/* その他 */}
        <div>
          <h3 className="mb-3 font-semibold">その他</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy">プライバシーポリシー</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* コピーライト */}
      <div className="mt-8 border-t border-gray-700 py-6 text-center text-xs text-gray-500">
        © 2025 VirtualSoundBox. All rights reserved.
      </div>
    </footer>
  );
}
