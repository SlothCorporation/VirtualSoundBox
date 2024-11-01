import Link from "next/link";
import {useState} from "react";
import {usePathname} from "next/navigation";

type SidebarItemProp = {
  route: string;
  icon?: string;
  label: string;
}

export default function SidebarItem({item}:{item: SidebarItemProp}) {
  const [isActive, setActive] = useState(item.route === usePathname());

  return (
    <>
    <li>
      <Link href={item.route} className={`${isActive ? "bg-gray-500": ""} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 hover:bg-gray-500`}>
        {item.icon} {item.label}
      </Link>
    </li>
    </>
  )
}
