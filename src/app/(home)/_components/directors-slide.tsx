"use client";

import DynamicTitle from "@/components/shared/dynamic-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { ErrorState } from "@/components/shared/error-state";
import { fetchDirectors } from "@/lib/redux/slices/director-slice";
import CardSkeleton from "@/components/skeletons/card-skel";

export default function DirectorsSlide() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.directors);

  useEffect(() => {
    dispatch(fetchDirectors());
  }, [dispatch]);
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );
  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchDirectors())} />
    );

  if (loading) return <CardSkeleton />;

  if (!loading && (!data || data.length === 0)) {
    return null;
  }

  return (
    <section
      className="px-14 lg:px-20 py-10 md:py-15 lg:py-20 bg-gradient-to-b from-[#045FC8] to-[#034896]"
      aria-labelledby="directors-title"
    >
      <DynamicTitle className="text-white" title="Board Of Directors" />=
      <Carousel
        className="relative w-full mt-5 md:mt-10"
        opts={{ loop: true, align: "start" }}
        plugins={[autoplay]}
        role="region"
        aria-roledescription="carousel"
        aria-label="Board of directors carousel"
      >
        <CarouselContent>
          {data.map((d, index) => (
            <CarouselItem
              key={d.id ?? index}
              className="md:basis-1/2 lg:basis-1/3"
              role="group"
              aria-roledescription="slide"
              aria-label={`director ${d.name} image`}
            >
              <article>
                <Card>
                  <CardHeader>
                    <Image
                      src={d.image}
                      width={300}
                      height={330}
                      alt={`Photo of ${d.name}, ${d.position}`}
                      className="aspect-[1/1.1] w-[90%] mx-auto rounded-md object-cover"
                      priority={index === 0}
                    />
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-center">
                    <h3 className="text-primary-500 font-semibold text-xl lg:text-2xl">
                      {d.name}
                    </h3>

                    <p className="text-base-900 text-lg lg:text-xl">
                      {d.position}
                    </p>

                    <div className="text-base-800 space-y-1">
                      <p>
                        <a href={`mailto:${d.email}`}>{d.email}</a>
                      </p>
                      <p>
                        <a href={`tel:${d.phone}`}>{d.phone}</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious
          aria-label="Previous slide"
          className="bg-white/50 hover:bg-white text-primary-500"
        />
        <CarouselNext
          aria-label="Next slide"
          className="bg-white/50 hover:bg-white text-primary-500"
        />
      </Carousel>
    </section>
  );
}
