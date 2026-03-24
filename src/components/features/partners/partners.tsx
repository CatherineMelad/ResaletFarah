"use client";

import DynamicTitle from "@/components/shared/dynamic-title";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchPartners } from "@/lib/redux/slices/partners-slice";
import { ErrorState } from "@/components/shared/error-state";
import PartnersSkeleton from "@/components/skeletons/partners-skel";

export default function Partners() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.partners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );
  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchPartners())} />
    );

  if (!loading && (!data || data.length === 0)) {
    return null;
  }

  return (
    <section
      className="px-14 lg:px-20 py-10 md:py-15 lg:py-20"
      aria-labelledby="partners-heading"
    >
      <DynamicTitle title="Our Partners" />

      {loading ? (
        <PartnersSkeleton />
      ) : (
        <Carousel
          className="relative mt-5 md:mt-10"
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay]}
          role="region"
          aria-roledescription="carousel"
          aria-label="Partners carousel"
        >
          <CarouselContent>
            {data.map((p, index) => (
              <CarouselItem
                key={p.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <Card className="bg-primary-700">
                  <CardContent className="p-0">
                    <Image
                      src={p.image}
                      alt={`${p.name} logo`}
                      width={150}
                      height={150}
                      sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                      className="aspect-square w-full rounded-md object-cover"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous partner"
            className="bg-primary-50 hover:bg-primary-100 text-primary-700"
          />

          <CarouselNext
            aria-label="Next partner"
            className="bg-primary-50 hover:bg-primary-100 text-primary-700"
          />
        </Carousel>
      )}
    </section>
  );
}
