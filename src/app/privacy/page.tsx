import React from "react";
import { Metadata } from "next";
import { PrivacyPage as PrivacyComponent } from "@/components/skxie/PrivacyPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for skxie website.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <PrivacyComponent isVisible={true} />
    </div>
  );
}
