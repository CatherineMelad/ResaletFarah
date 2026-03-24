import { Skeleton } from "@/components/ui/skeleton";

export default function NewsDetailsSkeleton() {
  return (
    <div className="pb-14 px-5 md:px-20 flex flex-col gap-6">
      {/* Title */}
      <Skeleton className="h-8 md:h-10 w-2/3" />

      {/* Thumbnail */}
      <Skeleton className="w-full aspect-video rounded-lg" />

      {/* Description lines */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-4/6" />
      </div>
    </div>
  );
}