import { Skeleton } from "@/components/ui/skeleton";

function StoryCardSkeleton({ reversed }: { reversed: boolean }) {
  return (
    <section
      className={`flex flex-col md:flex-row items-start md:items-center justify-center ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <Skeleton className="w-full aspect-square rounded-lg" />
      </div>

      {/* Text Card */}
      <div
        className={`w-full md:w-1/2 px-4 md:px-0 -mt-5 md:-mt-0 ${
          reversed ? "md:-mr-5 lg:-mr-10" : "md:-ml-5 lg:-ml-10"
        }`}
      >
        <div
          className={`bg-white shadow-[0_0px_60px_-30px_rgba(0,0,0,0.3)] p-4 lg:p-8 rounded-[40px] ${
            reversed ? "rounded-tr-none" : "rounded-tl-none"
          }`}
        >
          {/* Title */}
          <Skeleton className="h-7 w-2/3 mb-4" />

          {/* Description lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-3/6" />
          </div>

          {/* Read more */}
          <Skeleton className="h-4 w-24 mt-3" />
        </div>
      </div>
    </section>
  );
}

export default function AboutCardsSkeleton() {
  return (
    <div className="space-y-16 px-5 md:px-20 pb-14">
      {[0, 1, 2].map((i) => (
        <StoryCardSkeleton key={i} reversed={i % 2 !== 0} />
      ))}
    </div>
  );
}