import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryDetailsSkeleton() {
  return (
    <section className="pb-14 px-5 md:px-20">
      {/* Title */}
      <Skeleton className="h-8 w-48 mb-6" />

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full h-[220px] md:h-[260px] rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}