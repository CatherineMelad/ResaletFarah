import React from "react";
import Image from "next/image";
import DynamicTitle from "@/components/shared/dynamic-title";

export default function VolunteerHeader() {
  return (
    <section className="relative" aria-label="Homepage cover slider">
      <div>
        <Image
          src="/assets/img.jpg"
          alt="cover image"
          width={1600}
          height={800}
          className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-500 opacity-50" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <DynamicTitle className="text-white" title="Volunteering Form" />
      </div>
    </section>
  );
}
