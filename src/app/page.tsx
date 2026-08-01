"use client";

import React from "react";
import { BlankCanvas } from "@/components/BlankCanvas";
import { SkyBackground } from "@/components/shared/SkyBackground";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <SkyBackground />
      <BlankCanvas />
    </div>
  );
}
