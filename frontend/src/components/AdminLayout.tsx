import React, { type ReactNode, useEffect } from "react";
import AdminGlobalNavLayout from "@/components/Layouts/AdminGlobalNavLayout";
import { SideNavHeading, SideNavLink } from "@/components/SideNav/SideNav";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useInitAuth } from "@/hooks/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Head from "next/head";

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
    if (user === undefined) return;

    if (user === null) {
      router.replace("/login");
    } else if (user.admin_flg === 0) {
      router.replace("/");
    }
  }, [user, router]);

  if (user?.admin_flg !== 1) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-black">
        <Spinner />
      </div>
    );
  }

  return (
    <AdminGlobalNavLayout sideNavContent={<SideNavContent />}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="flex w-full flex-1 justify-center bg-white text-black">
        <Sidebar />
        <div className="ml-72 w-full px-4">{children}</div>
      </main>
    </AdminGlobalNavLayout>
  );
}

export default AdminLayout;
