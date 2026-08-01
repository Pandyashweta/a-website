import React from "react";
import { Metadata } from "next";
import { FaqsPage as FaqsComponent } from "@/components/skxie/FaqsPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about skxie's books, releases, and updates.",
};

export default function FaqsPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <FaqsComponent isVisible={true} />
    </div>
  );
}
