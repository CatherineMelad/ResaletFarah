import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function WhoWeAreSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-48 mx-auto mb-10" />

      <div className="relative mt-10 lg:mt-20">
        <div className="hidden md:block h-[25vh] md:h-[40vh] lg:h-[60vh] bg-muted" />

        <div className="md:absolute md:inset-0 bg-primary-500/50" />

        <div
          className="
            md:absolute md:inset-0
            bg-primary-50 md:bg-transparent
            py-10 md:py-0
            grid grid-cols-1 md:grid-cols-3
            gap-5 lg:gap-10
            px-6 lg:px-20
            items-center
          "
        >
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-lg p-4 lg:p-6">
              <CardTitle className="flex items-center gap-2 pb-2">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </CardTitle>

              <CardContent className="p-0 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}