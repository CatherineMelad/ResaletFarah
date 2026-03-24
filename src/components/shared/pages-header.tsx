import React from "react";
import Image from "next/image";
import DynamicTitle from "@/components/shared/dynamic-title";

export default function PagesHeader({ title }: { title: string }) {
  return (
    <section aria-label="">
      <div className="relative">
        <Image
          src="/assets/img.jpg"
          alt="cover image"
          width={1000}
          height={1000}
          className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-500 opacity-50" />
      </div>

      {/* Title */}
      <div className="flex items-center gap-6 lg:gap-10 px-5 md:px-20 translate-y-[-35%]">
        {/* Image wrapper */}
        <div className="relative z-10 ">
          {/* Border frame (behind the image) */}
          <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-36 h-36 md:w-60 md:h-60 lg:w-72 lg:h-72 border-4 md:border-[6px] border-secondary-500 rounded-xl md:rounded-2xl z-0" />

          {/* Image */}
          <Image
            src="/assets/English text.jpg"
            alt="Resalet Farah logo"
            width={150}
            height={150}
            className="relative z-20 shadow-[0_5px_40px_-15px_rgba(0,0,0,0.3)] rounded-xl md:rounded-2xl w-36 h-36 md:w-60 md:h-60 lg:w-72 lg:h-72 object-cover"
          />
        </div>

        <DynamicTitle title={title} className="text-xl md:text-2xl" />
      </div>
    </section>
  );
}
