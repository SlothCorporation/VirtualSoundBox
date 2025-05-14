import React, { type ReactNode, useEffect } from "react";
import GlobalNavLayout from "@/components/Layouts/GlobalNavLayout";
import { SideNavHeading, SideNavLink } from "@/components/SideNav/SideNav";
import { useInitAuth } from "@/hooks/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import AuthSection from "@/components/SideNav/AuthSection";

interface LayoutProps {
  auth?: boolean;
  children: ReactNode;
}

function SideNavContent() {
  return (
    <>
      <AuthSection />
      <nav className="grow overflow-y-auto">
        <div className="flex flex-col gap-8 px-4 py-8">
          <div>
            <SideNavHeading title="会員メニュー" />
            <SideNavLink href="/">そのうち実装される</SideNavLink>
          </div>
          <div>
            <SideNavHeading title="コンテンツ" />
            <SideNavLink href="/post-generator">
              ポストジェネレーター
            </SideNavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

function Layout({ auth = false, children }: LayoutProps) {
  useInitAuth();
  const user = useAtomValue(userAtom);
  const router = useRouter();

  useEffect(() => {
    if (auth && user === null) {
      router.push("/login");
    }
  }, [auth, user]);

  if (auth && user === undefined) {
    // ローディングスピナー表示
    return (
      <div className="flex h-screen items-center justify-center bg-white text-black">
        <Spinner />
      </div>
    );
  }

  return (
    <GlobalNavLayout sideNavContent={<SideNavContent />}>
      <main className="flex w-full flex-1 justify-center bg-white text-black">
        <div className="w-full max-w-screen-xl px-4">{children}</div>
      </main>
    </GlobalNavLayout>
  );
}

export default Layout;
