"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "./Header";
import { NavItem } from "@/types";

export const HeaderWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Hide main author header on admin pages if desired
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems: NavItem[] = [
    { id: "books", label: "books", url: "https://books.skxie.com" },
    { id: "about", label: "about", url: "/about" },
    { id: "contact", label: "contact", url: "/contact" },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.url.startsWith("/")) {
      router.push(item.url);
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <Header
      navItems={navItems}
      onNavClick={handleNavClick}
      onLogoClick={handleLogoClick}
    />
  );
};
