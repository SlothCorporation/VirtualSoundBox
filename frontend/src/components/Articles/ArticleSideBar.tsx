export default function ArticleSideBar() {
  return (
    <aside className="w-full space-y-4 md:sticky md:top-20 md:w-1/3 md:shrink-0">
      <div className="rounded border bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">関連記事</h2>
        <ul className="space-y-1 text-sm text-blue-600">
          <li>・記事がまだ投稿されていません。</li>
        </ul>
      </div>
    </aside>
  );
}
