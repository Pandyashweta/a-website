import React from "react";
import { Metadata } from "next";
import { NewsletterPage as NewsletterComponent } from "@/components/skxie/NewsletterPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to skxie's newsletter for official announcements and story previews.",
};

export default function NewsletterPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <NewsletterComponent isVisible={true} />
    </div>
  );
}
