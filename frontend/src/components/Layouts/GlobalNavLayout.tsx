import React from "react";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";

interface GlobalNavLayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

export function GlobalNavLayout({
  sideNavContent,
  children,
}: GlobalNavLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header sideNavContent={sideNavContent} />
      {children}
      <div className="h-12 bg-white md:h-16" />
      <Footer />
    </div>
  );
}

export default GlobalNavLayout;
