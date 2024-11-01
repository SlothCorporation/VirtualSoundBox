import React, {useState} from 'react';
import {MdMenu} from 'react-icons/md';
import Link from "next/link";

interface GlobalNavLayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

export function GlobalNavLayout({
  sideNavContent,
  children
}: GlobalNavLayoutProps) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <header className="mb-12 w-full flex justify-center">
        <nav className="fixed top-0 inset-x-0 h-12 bg-black flex items-center justify-between z-50 w-full px-4">
          <div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="flex items-center leading-[0] space-x-4">
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
              className="flex items-center h-12 hover:bg-[#393939]"
            >
              <MdMenu color="white" size={24}/>
            </button>
            <aside
              className={`bg-white text-black z-50 fixed top-12 right-0 shadow-[0_2px_4px_rgba(0,0,0,0.15)] h-[calc(100vh_-_3rem)] overflow-y-auto transition-all duration-150 ease-in-out flex flex-col
                            ${isSideNavOpen ? 'w-[320px]' : 'w-0'}`}
            >
              {sideNavContent}
            </aside>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default GlobalNavLayout;
