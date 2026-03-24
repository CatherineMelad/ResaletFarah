"use client";

import { ErrorState } from "@/components/shared/error-state";
import DirectorsPageSkeleton from "@/components/skeletons/directors-page-skel";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchDirectors } from "@/lib/redux/slices/director-slice";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import React, { useEffect } from "react";

export default function DirectorsCards() {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.directors);

  // Fetch data once on mount
  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return <DirectorsPageSkeleton />;
  }

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchDirectors())} />
    );

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return null;
  }
  return (
    <div className="-mt-14">
      {data.map((item, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <article
            key={item.id}
            className={cn(
              `grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 py-14 px-5 md:px-20 ${
                isReversed
                  ? "bg-gradient-to-br from-[#045FC8] to-[#034896]"
                  : "bg-white"
              }`,
            )}
            aria-label={`About ${item.name}`}
          >
            {/* Director Info */}
            <div className="md:col-span-2 space-y-4 md:pr-8 lg:pr-24">
              <h2
                className={cn(
                  `text-2xl lg:text-3xl font-bold break-words ${
                    isReversed ? "text-white" : "text-primary-500"
                  }`,
                )}
              >
                About Our {item.position}
              </h2>

              <p
                className={cn(
                  `text-sm lg:text-base break-words ${
                    isReversed ? "text-white" : "text-gray-700"
                  }`,
                )}
              >
                {item.description}
              </p>
            </div>

            {/* Image Card */}
            <div className="w-full bg-primary-500 p-4 lg:p-6 rounded-xl ">
              <div className=" rounded-xl border-4 border-secondary-300">
                <Image
                  src={item.image}
                  alt={`Portrait of ${item.name}, ${item.position}`}
                  width={500}
                  height={420}
                  className="w-full aspect-[1/1] object-cover rounded-xl"
                  priority={index === 0}
                />
              </div>
              <div className="text-white mt-4">
                <h3 className="text-2xl md:text-xl lg:text-3xl font-semibold break-words">
                  {item.name}
                </h3>
                <p className="text-lg md:text-md lg:text-2xl mt-0.5 break-words">
                  {item.position}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
