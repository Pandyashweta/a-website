import React from "react";
import { Metadata } from "next";
import { TermsPage as TermsComponent } from "@/components/skxie/TermsPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions for skxie website.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <TermsComponent isVisible={true} />
    </div>
  );
}
