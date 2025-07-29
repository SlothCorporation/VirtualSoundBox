export default function ArticleShareButtons() {
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        この記事をシェアする
      </h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          X（旧Twitter）
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-800"
        >
          Facebook
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
        >
          LINE
        </a>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(location.href);
            alert("リンクをコピーしました！");
          }}
          className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          リンクをコピー
        </button>
      </div>
    </div>
  );
}
