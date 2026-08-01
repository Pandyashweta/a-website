"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { SocialItem } from "@/types";

export const FooterWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const skxieSocials: SocialItem[] = [
    { id: "sk-insta", name: "Instagram", icon: "instagram", url: "https://instagram.com/skxielol" },
    { id: "sk-discord", name: "Discord", icon: "discord", url: "https://discord.gg/skxie" },
    { id: "sk-email", name: "Email", icon: "email", url: "mailto:skxielol@gmail.com" },
    { id: "sk-amazon", name: "Amazon", icon: "amazon", url: "https://amazon.com/author/skxie" },
    { id: "sk-goodreads", name: "Goodreads", icon: "goodreads", url: "https://goodreads.com/skxie" },
    { id: "sk-wattpad", name: "Wattpad", icon: "wattpad", url: "https://wattpad.com/user/skxielol" },
    { id: "sk-stckme", name: "Stck.me", icon: "stckme", url: "https://stck.me/@skxie" },
  ];

  return (
    <Footer
      skxieSocials={skxieSocials}
      onPrivacyClick={() => router.push("/privacy")}
      onTermsClick={() => router.push("/terms")}
      onFaqsClick={() => router.push("/faqs")}
      onNewsletterClick={() => router.push("/newsletter")}
    />
  );
};
