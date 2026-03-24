import { Skeleton } from "@/components/ui/skeleton";

export default function PartnersSkeleton() {
  return (
    <div className="mt-5 md:mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} >
            <div className="p-0">
              <Skeleton className="aspect-square w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}