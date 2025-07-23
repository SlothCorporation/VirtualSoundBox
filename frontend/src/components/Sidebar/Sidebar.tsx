import React from "react";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import {
  MdArticle,
  MdList,
  MdAdd,
  MdMusicNote,
  MdPerson,
  MdTag,
  MdCategory,
} from "react-icons/md";

const menu = [
  {
    label: "ダッシュボード",
    route: "/admin",
  },
  {
    label: "記事管理",
    icon: <MdArticle />,
    children: [
      { route: "/admin/articles", label: "記事一覧", icon: <MdList /> },
      { route: "/admin/category", label: "カテゴリー", icon: <MdCategory /> },
      { route: "/admin/tag", label: "タグ", icon: <MdTag /> },
    ],
  },
  {
    route: "/admin/users",
    label: "ユーザー管理",
    icon: <MdPerson />,
  },
  {
    route: "/admin/music",
    label: "楽曲管理",
    icon: <MdMusicNote />,
  },
];

export default function Sidebar() {
  return (
    <aside className="z-9999 fixed left-0 flex h-screen w-72 flex-col overflow-y-auto bg-gray-800 text-white">
      <ul className="mb-6 flex flex-col gap-1.5 p-2">
        {menu.map((menuItem, index) => (
          <SidebarItem key={index} item={menuItem} />
        ))}
      </ul>
    </aside>
  );
}
