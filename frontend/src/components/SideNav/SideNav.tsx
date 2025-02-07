import React from "react";
import Link from "next/link";

export function SideNavLink({
  children,
  href,
  external = false,
  isCurrentLocation = false,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  isCurrentLocation?: boolean;
}) {
  return (
    <Link
      className={`block truncate rounded px-4 py-2.5 text-sm !text-black no-underline ${
        isCurrentLocation ? "bg-role-serected" : "hover:bg-role-hover"
      }`}
      href={href}
      {...(external ? { target: "_blank" } : {})}
    >
      {children}
    </Link>
  );
}

export function SideNavHeading({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-1 truncate px-4 pb-2">
      {children}
      <span className="text-xs">{title}</span>
    </div>
  );
}
