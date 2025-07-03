import type { ReactNode } from "react";
import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface SidebarPanelProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const SidebarPanel = ({
  title,
  children,
  defaultOpen = true,
}: SidebarPanelProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-2 rounded border bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-left text-sm font-medium hover:bg-gray-200"
      >
        <span>{title}</span>
        {open ? <MdArrowDropUp size={16} /> : <MdArrowDropDown size={16} />}
      </button>
      {open && (
        <div className="border-t bg-white px-4 py-3 text-sm">{children}</div>
      )}
    </div>
  );
};
