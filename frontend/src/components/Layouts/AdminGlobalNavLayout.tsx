import React from "react";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";

interface AdminGlobalNavLayoutProps {
  children: React.ReactNode;
  sideNavContent: React.ReactNode;
}

export function AdminGlobalNavLayout({
  sideNavContent,
  children,
}: AdminGlobalNavLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header sideNavContent={sideNavContent} />
      {children}
    </div>
  );
}

export default AdminGlobalNavLayout;
