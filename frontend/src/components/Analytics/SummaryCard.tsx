import { MdArrowDownward, MdArrowUpward, MdRemove } from "react-icons/md";

type SummaryCardProps = {
  title: string;
  current: number;
  previous: number;
};

export default function SummaryCard({
  title,
  current,
  previous,
}: SummaryCardProps) {
  const diff = current - previous;
  const rate = previous === 0 ? 0 : ((diff / previous) * 100).toFixed(1); // %換算

  const isUp = diff > 0;
  const isDown = diff < 0;

  const color = isUp
    ? "text-green-600"
    : isDown
      ? "text-red-600"
      : "text-gray-600";
  const Icon = isUp ? MdArrowUpward : isDown ? MdArrowDownward : MdRemove;

  return (
    <div className="flex min-w-[200px] flex-col items-center gap-1 rounded-2xl bg-white p-4 shadow">
      <span className="text-sm text-gray-500">{title}</span>

      {/* current を中央揃え */}
      <span className="text-center text-2xl font-semibold">
        {current.toLocaleString()}
      </span>

      {/* 差分も中央揃え */}
      <div className={`flex items-center text-sm ${color}`}>
        <Icon className="mr-1 size-4" />
        {isUp || isDown
          ? `${isUp ? "+" : "-"}${Math.abs(Number(rate))}% (${diff.toLocaleString()})`
          : "-"}
      </div>
    </div>
  );
}
