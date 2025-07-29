import Layout from "../components/Layout";
import type { Article } from "@/hooks/articles/api";
import TopicBlock from "@/components/Articles/TopicBlock";
import ArticleCard from "@/components/Articles/ArticleCard";
import ArticleSideBar from "@/components/Articles/ArticleSideBar";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

// ダミーは10件作ってください
const articleDummy: Article[] = [
  {
    id: 1,
    title: '🌙 話題沸騰中！"月と夜風をまとう歌姫"──風崎ルナとは？',
    body: "記事の内容1",
    category: "アーティスト",
    tags: ["風崎ルナ"],
    coverImage: {
      id: 101,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 102,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-01T00:00:00Z",
  },
  {
    id: 2,
    title: "🔥 VSBFes 2023 開催決定！風崎ルナ、火桶ソル、月城ミライの豪華共演",
    body: "記事の内容2",
    category: "イベント",
    tags: ["VSBFes", "風崎ルナ", "火桶ソル", "月城ミライ"],
    coverImage: {
      id: 103,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 104,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-02T00:00:00Z",
  },
  {
    id: 3,
    title: "🎤 新曲「月夜のメロディ」リリース！風崎ルナの魅力全開",
    body: "記事の内容3",
    category: "楽曲",
    tags: ["風崎ルナ", "月夜のメロディ"],
    coverImage: {
      id: 105,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 106,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-03T00:00:00Z",
  },
  {
    id: 4,
    title: "🌟 風崎ルナの初の写真集「月光の下で」発売決定！",
    body: "記事の内容4",
    category: "カテゴリー4",
    tags: ["タグ7", "タグ8"],
    coverImage: {
      id: 107,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 108,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-04T00:00:00Z",
  },
  {
    id: 5,
    title: "🌌 風崎ルナの新たな挑戦！「月の光と共に」ツアー開催",
    body: "記事の内容5",
    category: "カテゴリー5",
    tags: ["タグ9", "タグ10"],
    coverImage: {
      id: 109,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 110,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-05T00:00:00Z",
  },
  {
    id: 6,
    title: "🌠 風崎ルナ、月城ミライとのコラボ曲「星空の約束」発表！",
    body: "記事の内容6",
    category: "カテゴリー6",
    tags: ["タグ11", "タグ12"],
    coverImage: {
      id: 111,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 112,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-06T00:00:00Z",
  },
  {
    id: 7,
    title: "火桶ソル、月城ミライの新曲「夜空のシンフォニー」リリース！",
    body: "記事の内容7",
    category: "カテゴリー7",
    tags: ["タグ13", "タグ14"],
    coverImage: {
      id: 113,
      url: "https://via.placeholder.com/600x400",
    },
    thumbnailImage: {
      id: 114,
      url: "https://virtual-sound-box-dev.s3.ap-northeast-1.amazonaws.com/articles/3/thumbnail/9bdc547a-fb91-48c0-848e-e27b21fc82a7.jpeg",
    },
    publishAt: "2023-10-07T00:00:00Z",
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="mx-auto mt-5 max-w-6xl rounded border">
        <TopicBlock articles={articleDummy} />
      </div>
      <div className="mx-auto mt-10 max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* メイン記事一覧（2/3） */}
          <div className="w-full rounded border md:col-span-2 md:w-2/3">
            <div className="flex items-center border-b border-gray-300 px-4 py-2">
              <div className="mr-2 h-5 w-1 rounded-full bg-sky-500" />
              <h2 className="text-lg font-bold text-gray-800">新着記事</h2>
            </div>

            {articleDummy.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
            <div className="border-t border-gray-200">
              <Link href="/articles" className="text-sm">
                <div className="flex justify-end p-2 hover:bg-gray-50">
                  <span className="flex items-center gap-1">
                    最新記事をもっと見る
                    <MdChevronRight />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* サイドバー（1/3） */}
          <ArticleSideBar />
        </div>
      </div>
    </Layout>
  );
}
