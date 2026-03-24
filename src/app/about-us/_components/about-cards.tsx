"use client";

import { ErrorState } from "@/components/shared/error-state";
import AboutCardsSkeleton from "@/components/skeletons/about-cards-skel";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchWhoWeAre } from "@/lib/redux/slices/who-we-are-slice";
import { getWhoWeAreIcon } from "@/lib/utils/who-we-are-Icon";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";

export default function AboutCards() {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.whoWeAre);

  // Fetch data once on mount
  useEffect(() => {
    dispatch(fetchWhoWeAre());
  }, [dispatch]);

  // Sort sliders by order
  const sortedSliders = useMemo(() => {
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);

  // Loading state
  if (loading) {
    return <AboutCardsSkeleton />;
  }

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchWhoWeAre())} />
    );

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return null;
  }
  return (
    <div className="space-y-16 px-5 md:px-20">
      {sortedSliders.map((item, index) => {
        const Icon = getWhoWeAreIcon(item.title);
        const isReversed = index % 2 !== 0;

        return (
          <section
            key={item.id}
            className={cn(
              `flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`,
            )}
          >
            {/* Text */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 pb-2 text-primary-500 text-2xl lg:text-3xl font-semibold">
                <Icon size={30} aria-hidden />
                <h3>{item.title}</h3>
              </div>

              <p className="text-sm lg:text-lg text-justify max-w-xl">
                {item.description}
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src={item.image}
                alt={"gjkhghj"}
                width={500}
                height={500}
                className="w-full max-w-lg rounded-lg object-cover"
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
