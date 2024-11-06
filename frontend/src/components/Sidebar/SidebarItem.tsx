import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItemProp = {
  route: string;
  icon?: string;
  label: string;
};

export default function SidebarItem({ item }: { item: SidebarItemProp }) {
  const isActive = item.route === usePathname();

  return (
    <>
      <li>
        <Link
          href={item.route}
          className={`${isActive ? "bg-gray-500" : ""} text-bodydark1 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium hover:bg-gray-500`}
        >
          {item.icon} {item.label}
        </Link>
      </li>
    </>
  );
}
