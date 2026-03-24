import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton() {
  return (
    <article className="h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="p-0">
          <Skeleton className="aspect-square w-full rounded-md rounded-b-none" />
        </CardHeader>
        <CardContent className="text-center pt-4 lg:pt-6 flex flex-col flex-1 justify-between">
          <div className="mb-2 space-y-2">
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <Skeleton className="h-9 w-full mt-2" />
        </CardContent>
      </Card>
    </article>
  );
}

export default function DynamicCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-14 px-5 md:px-20">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}