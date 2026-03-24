import { Skeleton } from "../ui/skeleton";

export default function CoverSliderSkeleton() {
  return (
    <section className="relative w-full">
      {/* Skeleton image */}
      <Skeleton className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] bg-gray-200 animate-pulse" />

      {/* Overlay */}
      <Skeleton className="absolute inset-0 bg-primary-500 opacity-50 animate-pulse" />

      {/* Title placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton className="h-6 md:h-8 lg:h-12 w-48 md:w-64 lg:w-96 bg-gray-300 rounded animate-pulse" />
        <div />
      </div>
    </section>
  );
}
