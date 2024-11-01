import React from "react";
import SidebarItem from "@/components/Sidebar/SidebarItem";

const menu = [
  {
    route: '/admin/post-generator',
    label: 'ポストジェネレター',
  },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-gray-800 text-white">
      <ul className="mb-6 flex flex-col gap-1.5">
      {menu.map((menuItem, menuIndex) => (
        <SidebarItem key={menuIndex} item={menuItem} />
      ))}
      </ul>
    </aside>
  )
}
