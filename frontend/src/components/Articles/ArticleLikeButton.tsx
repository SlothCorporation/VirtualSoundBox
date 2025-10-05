import { useIncrementArticleLike } from "@/hooks/articles/api";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

type ArticleLikeButtonProps = {
  articleId: string;
  initialCount: number;
};

export default function ArticleLikeButton({
  articleId,
  initialCount,
}: ArticleLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const { mutateAsync: incrementArticleLike } =
    useIncrementArticleLike(articleId);

  useEffect(() => {
    const likedArticles = JSON.parse(
      localStorage.getItem("likedArticles") || "[]",
    );
    if (likedArticles.includes(articleId)) {
      setLiked(true);
    }
  }, [articleId]);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setCount((prev) => prev + 1);

    // ローカル保存
    const likedArticles = JSON.parse(
      localStorage.getItem("likedArticles") || "[]",
    );
    localStorage.setItem(
      "likedArticles",
      JSON.stringify([...new Set([...likedArticles, articleId])]),
    );

    try {
      const res = await incrementArticleLike();
      console.log(res);
    } catch (err) {
      console.error("Failed to send reaction", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={clsx(
        "mx-auto mt-8 flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition",
        liked
          ? "cursor-default border-pink-300 bg-pink-100 text-pink-600"
          : "border-gray-300 text-gray-700 hover:bg-gray-50",
      )}
    >
      <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
      <span>{liked ? "Thanks!" : "いいね"}</span>
      <span className="ml-1 text-gray-500">{count}</span>
    </button>
  );
}
