"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

type ChildRoute = {
  route: string;
  label: string;
  icon?: React.ReactNode;
};

type SidebarItemProp =
  | {
      label: string;
      route: string;
      icon?: React.ReactNode;
    }
  | {
      label: string;
      icon?: React.ReactNode;
      children: ChildRoute[];
    };

export default function SidebarItem({ item }: { item: SidebarItemProp }) {
  const pathname = usePathname();
  const isNested = "children" in item;
  const [isOpen, setIsOpen] = useState(false);

  const isActiveChild =
    isNested && item.children.some((child) => pathname === child.route);

  useEffect(() => {
    if (isActiveChild) setIsOpen(true);
  }, [isActiveChild]);

  // 通常の単体リンク
  if (!isNested) {
    const isActive = pathname === item.route;
    return (
      <li>
        <Link
          href={item.route}
          className={`flex items-center gap-2 rounded-sm px-4 py-2 ${
            isActive ? "bg-gray-500" : "hover:bg-gray-500"
          }`}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  // アコーディオン型（ネストあり）
  return (
    <li>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-sm px-4 py-2 ${
          isActiveChild ? "bg-gray-600" : "hover:bg-gray-500"
        }`}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        <span>{isOpen ? <MdExpandMore /> : <MdChevronRight />}</span>
      </button>

      {isOpen && (
        <ul>
          {item.children.map((child, index) => {
            const isChildActive = pathname === child.route;
            return (
              <li key={index}>
                <Link
                  href={child.route}
                  className={`flex items-center gap-2 px-8 py-2 text-sm ${
                    isChildActive ? "bg-gray-500" : "hover:bg-gray-400"
                  }`}
                >
                  {child.icon && <span>{child.icon}</span>}
                  <span>{child.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
