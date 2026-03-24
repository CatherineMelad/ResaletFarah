"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContactDetailsSkeleton() {
  return (
    <section className="py-16 px-5 md:px-20 text-center">
    <Card className="mt-10 rounded-2xl shadow-md">
      <CardContent className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}

            {/* Social icons */}
            <div className="flex gap-3 pt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Skeleton className="w-[250px] h-[250px] rounded-xl" />
          </div>
        </div>
      </CardContent>
    </Card></section>
  );
}