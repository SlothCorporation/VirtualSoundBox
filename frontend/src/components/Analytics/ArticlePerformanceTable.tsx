import type { ArticleView } from "@/generated/graphql";

export default function ArticlePerformanceTable({
  data,
}: {
  data: ArticleView[];
}) {
  return (
    <div className="w-fit overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <table className="table-fixed text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="max-w-[300px] px-4 py-3 text-left">記事</th>
            <th
              className="min-w-[100px] max-w-[150px] px-2 py-3 text-right"
              title="ページの表示回数と前週比の変化率"
            >
              表示回数
            </th>
            <th
              className="max-w-[80px] break-words px-2 py-3 text-right"
              title="一定期間に記事を閲覧したユーザー数"
            >
              アクティブ
              <br />
              ユーザー
            </th>
            <th
              className="max-w-[70px] break-words px-2 py-3 text-right"
              title="クリック・スクロールなどのユーザーイベントの合計"
            >
              イベント
              <br />数
            </th>
            <th
              className="max-w-[70px] break-words px-2 py-3 text-right"
              title="ユーザーが記事を閲覧した平均時間"
            >
              平均
              <br />
              滞在時間
            </th>
            <th
              className="max-w-[70px] px-2 py-3 text-right"
              title="1ページだけ見て離脱したセッションの割合"
            >
              直帰率
            </th>
          </tr>
        </thead>

        <tbody className="text-gray-800">
          {data.map((a) => {
            const diff = a.previous
              ? a.current.pageViews! - a.previous.pageViews!
              : 0;
            const rate =
              a.previous && a.previous.pageViews! > 0
                ? (diff / a.previous.pageViews!) * 100
                : 0;
            const color =
              diff > 0
                ? "text-green-600"
                : diff < 0
                  ? "text-red-600"
                  : "text-gray-500";
            const icon = diff > 0 ? "▲" : diff < 0 ? "▼" : "–";

            return (
              <tr
                key={a.title}
                className="bg-white transition-colors duration-150 hover:bg-gray-50"
              >
                <td
                  className="max-w-[300px] overflow-visible truncate px-4 py-2 font-medium"
                  title={a.title}
                >
                  {a.title}
                </td>

                <td className="min-w-[100px] max-w-[150px] p-2 text-right">
                  {a.current.pageViews!.toLocaleString()}
                  {a.previous && (
                    <>
                      <span className={`ml-2 text-xs ${color}`}>
                        {icon} {Math.abs(rate).toFixed(1)}%
                      </span>
                      <div className="text-xs text-gray-500">
                        前回: {a.previous.pageViews!.toLocaleString()}
                      </div>
                    </>
                  )}
                </td>

                <td className="max-w-[80px] p-2 text-right">
                  {a.current.activeUsers!.toLocaleString()}
                </td>
                <td className="max-w-[70px] p-2 text-right">
                  {a.current.events!.toLocaleString()}
                </td>
                <td className="max-w-[70px] p-2 text-right">
                  {a.current.avgDuration}
                </td>
                <td className="max-w-[70px] p-2 text-right">
                  {Math.floor(a.current.bounceRate!)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
