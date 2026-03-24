"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type DynamicTitleProps = {
  title: string;
  className?: string;
};

export default function DynamicTitle({ title, className }: DynamicTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  return (
    <div
      className="group text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1
        ref={titleRef}
        className={cn(
          "inline-block text-2xl font-semibold capitalize text-primary-500 lg:text-4xl",
          className,
        )}
      >
        {title}
      </h1>

      {/* underline */}
      <div className="mx-auto mt-1 lg:mt-4 flex justify-center items-center">
        <span
          className={cn(
            "md:h-2 md:w-2 h-1.5 w-1.5 rounded-full bg-secondary-300",
          )}
        />
        <span
          className={cn(
            "mx-1 md:h-2 md:w-4 h-1.5 w-2.5 rounded-full bg-secondary-300",
          )}
        />

        <span
          className={cn(
            "md:h-2 h-1.5 rounded-full bg-secondary-300 transition-all duration-300 ease-out",
          )}
          style={{
            width: hovered ? width * 1.1 : width,
          }}
        />

        <span
          className={cn(
            "mx-1 md:h-2 md:w-4 h-1.5 w-2.5 rounded-full bg-secondary-300",
          )}
        />
        <span
          className={cn(
            "md:h-2 md:w-2 h-1.5 w-1.5 rounded-full bg-secondary-300",
          )}
        />
      </div>
    </div>
  );
}
