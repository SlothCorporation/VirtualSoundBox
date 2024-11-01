import React, {ReactNode} from 'react';
import GlobalNavLayout from "@/components/layouts/GlobalNavLayout";
import {SideNavHeading, SideNavLink} from "@/components/sideNav/sideNav";

interface LayoutProps {
    children: ReactNode;
}

function SideNavContent() {
    return (
        <>
            <nav className="grow overflow-y-auto">
                <div className="flex flex-col gap-8 px-4 py-8">
                    <div>
                        <SideNavHeading title="会員メニュー"/>
                        <SideNavLink href="/">そのうち実装される</SideNavLink>
                    </div>
                    <div>
                        <SideNavHeading title="コンテンツ"/>
                        <SideNavLink href="/">ランキング</SideNavLink>
                    </div>
                </div>
            </nav>
        </>
    );
}

function Layout({children}: LayoutProps) {
    return (
      <GlobalNavLayout
        sideNavContent={<SideNavContent/>}
      >
          <main className="flex-1 w-full flex justify-center bg-white text-black">
              <div className="w-full max-w-[1280px] px-4">
                  {children}
              </div>
          </main>
      </GlobalNavLayout>
    );
};

export default Layout;
