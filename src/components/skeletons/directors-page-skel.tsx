"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DirectorsPageSkeleton() {
  return (
    <div className="-mt-14">
      {Array.from({ length: 3 }).map((_, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 py-14 px-5 md:px-20 ${
              isReversed ? "bg-muted" : "bg-white"
            }`}
          >
            {/* Text */}
            <div className="md:col-span-2 space-y-4 md:pr-8 lg:pr-24">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Image Card */}
            <div className="w-full p-4 lg:p-6 rounded-xl ">
              <div className="rounded-xl border-4 ">
                <Skeleton className="w-full aspect-[1/1] rounded-xl" />
              </div>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
