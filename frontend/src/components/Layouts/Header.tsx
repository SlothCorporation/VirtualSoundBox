import Link from "next/link";
import { MdMenu } from "react-icons/md";
import React, { useState } from "react";

type HeaderProps = {
  sideNavContent: React.ReactNode;
};

export default function Header({ sideNavContent }: HeaderProps) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <header className="mb-12 flex w-full justify-center">
      <nav className="fixed inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between bg-black px-4">
        <div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="flex items-center space-x-4 leading-[0]">
                VirtualSoundBox
              </div>
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={(e) => {
              setIsSideNavOpen(!isSideNavOpen);
              e.stopPropagation();
            }}
            className="flex h-12 items-center hover:bg-[#393939]"
          >
            <MdMenu color="white" size={24} />
          </button>
          <aside
            className={`fixed right-0 top-12 z-50 flex h-[calc(100vh_-_3rem)] flex-col overflow-y-auto bg-white text-black shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition-all duration-150 ease-in-out
                            ${isSideNavOpen ? "w-[320px]" : "w-0"}`}
          >
            {sideNavContent}
          </aside>
        </div>
      </nav>
    </header>
  );
}
