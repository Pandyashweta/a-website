import React from "react";
import { Metadata } from "next";
import { AboutPage as AboutComponent } from "@/components/skxie/AboutPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about skxie — digital storyteller and novelist.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <AboutComponent isVisible={true} />
    </div>
  );
}
