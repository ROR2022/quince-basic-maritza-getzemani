"use client"
import React from "react";
import {
  BasicHero,
  BasicCountdown,
  BasicEventDetails,
  BasicAttendance,
  BasicGiftOptions
} from "@/components/sections/basic";
import ParentsSection from "@/components/sections/ParentsSection";
import BasicCTA from "@/components/sections/BasicCTA";
import AudioPlayer from "@/components/AudioPlayer";

const page = () => {
  return (
    <div
    className="bg-slate-200"
    >
      <BasicHero />
      <BasicCountdown />
      <ParentsSection />
      <BasicEventDetails />
      <BasicGiftOptions />
      <BasicAttendance />
      <BasicCTA />

      {/* 🎵 Reproductor de audio fijo */}
      <AudioPlayer />
    </div>
  );
};

export default page;
