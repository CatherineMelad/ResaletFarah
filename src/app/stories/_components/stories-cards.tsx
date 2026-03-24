"use client";

import { ErrorState } from "@/components/shared/error-state";
import StoryCardSkeleton from "@/components/skeletons/stories-skel";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchStories } from "@/lib/redux/slices/stories-slice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import StoryDialog from "./story-dialog";

type SelectedStory = {
  title: string | null;
  description: string | null;
  image: string | null;
};

export default function StoriesCards() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.stories);
  const [selectedStory, setSelectedStory] = useState<SelectedStory | null>(null);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (loading) return <StoryCardSkeleton />;

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchStories())} />
    );

  if (!data || data.length === 0) return null;

  return (
    <>
      <div className="space-y-16 px-5 md:px-20 pb-14">
        {data.map((item, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <section
              key={item.id}
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center justify-center",
                isReversed && "md:flex-row-reverse",
              )}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 flex -z-10">
                <Image
                  src={item.image}
                  alt={item?.title ?? "Story Image"}
                  width={500}
                  height={500}
                  className="w-full rounded-lg object-cover"
                />
              </div>

              {/* Text */}
              <div
                className={cn(
                  "w-full md:w-1/2 px-4 md:px-0 -mt-5 md:-mt-0",
                  isReversed ? "md:-mr-5 lg:-mr-10" : "md:-ml-5 lg:-ml-10",
                )}
              >
                <div
                  className={cn(
                    "relative bg-white shadow-[0_0px_60px_-30px_rgba(0,0,0,0.3)] p-4 lg:p-8 rounded-[40px]",
                    isReversed ? "rounded-tr-none" : "rounded-tl-none",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 translate-y-4 rounded-[40px] border-4 bg-secondary-100 border-secondary-400 -z-10",
                      isReversed
                        ? "rounded-tr-none -translate-x-4"
                        : "rounded-tl-none translate-x-4",
                    )}
                  />

                  <h3 className="pb-2 text-primary-500 text-2xl lg:text-3xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-sm lg:text-lg text-base-800 max-w-xl line-clamp-4 lg:line-clamp-6">
                    {item.description}
                  </p>

                  <button
                    onClick={() =>
                      setSelectedStory({
                        title: item.title,
                        description: item.description,
                        image: item.image,
                      })
                    }
                    className="mt-1 lg:mt-3 text-primary-500 font-semibold text-sm lg:text-base hover:underline"
                  >
                    read more...
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <StoryDialog
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </>
  );
}