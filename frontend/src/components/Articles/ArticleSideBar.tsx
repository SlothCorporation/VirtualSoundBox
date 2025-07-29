export default function ArticleSideBar() {
  return (
    <aside className="w-full space-y-4 md:sticky md:top-20 md:w-1/3 md:shrink-0">
      <div className="rounded border bg-white p-4 shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">関連記事</h2>
        <ul className="space-y-1 text-sm text-blue-600">
          <li>・おすすめ記事１</li>
          <li>・おすすめ記事２</li>
          <li>・おすすめ記事３</li>
        </ul>
      </div>

      {/*<div className="rounded border bg-white p-4 shadow">*/}
      {/*  <h2 className="mb-2 text-lg font-semibold text-gray-800">タグ一覧</h2>*/}
      {/*  <div className="flex flex-wrap gap-2">*/}
      {/*    {article.tags.map((tag) => (*/}
      {/*      <span key={tag} className="text-xs text-gray-600">*/}
      {/*        #{tag}*/}
      {/*      </span>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </aside>
  );
}
