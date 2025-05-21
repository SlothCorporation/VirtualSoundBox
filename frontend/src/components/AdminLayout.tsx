import React, { type ReactNode, useEffect } from "react";
import GlobalNavLayout from "@/components/Layouts/GlobalNavLayout";
import { SideNavHeading, SideNavLink } from "@/components/SideNav/SideNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useInitAuth } from "@/hooks/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

function SideNavContent() {
  return (
    <>
      <nav className="grow overflow-y-auto">
        <div className="flex flex-col gap-8 px-4 py-8">
          <div>
            <SideNavHeading title="会員メニュー" />
            <SideNavLink href="/">そのうち実装される</SideNavLink>
          </div>
          <div>
            <SideNavHeading title="コンテンツ" />
            <SideNavLink href="/">ランキング</SideNavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

function AdminLayout({ children }: LayoutProps) {
  useInitAuth();
  const user = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (user?.admin_flg === 0) {
      router.push("/");
    }
  }, [user]);

  return (
    <GlobalNavLayout sideNavContent={<SideNavContent />}>
      <main className="flex w-full flex-1 justify-center bg-white text-black">
        <Sidebar />
        <div className="ml-72 w-full px-4">{children}</div>
      </main>
    </GlobalNavLayout>
  );
}

export default AdminLayout;
