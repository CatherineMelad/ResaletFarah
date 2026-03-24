import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-14 lg:px-20 py-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full space-y-4">
          <Skeleton className="aspect-[1/1.1] mx-auto rounded-md" />

          <div className="space-y-2 text-center">
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-5 w-1/3 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
