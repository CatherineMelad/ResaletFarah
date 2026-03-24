import { Skeleton } from "@/components/ui/skeleton";

interface AboutCardsSkeletonProps {
  count?: number;
}

export default function AboutCardsSkeleton({
  count = 3,
}: AboutCardsSkeletonProps) {
  return (
    <div className="space-y-16 px-5 md:px-20">
      {Array.from({ length: count }).map((_, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between md:gap-8 ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text skeleton */}
            <div className="md:w-1/2 space-y-4">
              <Skeleton className="h-8 md:w-48" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Image skeleton */}
            <div className="md:w-1/2 flex justify-center">
              <Skeleton className="w-full max-w-lg h-[280px] rounded-lg" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
