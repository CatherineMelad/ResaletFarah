import { Skeleton } from "@/components/ui/skeleton";

export default function NewsSlideSkeleton() {
  return (
    <section className="px-14 lg:px-20 py-10 md:py-15 lg:py-20 relative">
      {/* Background Skeleton */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Skeleton className="w-full h-full opacity-50" />
      </div>

      <div className="relative z-10">
        {/* Title */}
        <div className="flex justify-center">
          <Skeleton className="h-8 w-64 mb-6" />
        </div>

        {/* Carousel Skeleton */}
        <div className="mt-5 md:mt-10 flex gap-4 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div key={item} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="rounded-xl overflow-hidden">
                {/* Image */}
                <Skeleton className="w-full h-[220px]" />

                {/* Content */}
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />

                  <Skeleton className="h-10 w-full mt-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
