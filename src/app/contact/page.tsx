import React from "react";
import { Metadata } from "next";
import { ContactPage as ContactComponent } from "@/components/skxie/ContactPage";
import { SkyBackground } from "@/components/shared/SkyBackground";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with skxie for questions, feedback, or collaboration.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <ContactComponent isVisible={true} />
    </div>
  );
}
