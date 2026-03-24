"use client";

import React, { useEffect, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselDots } from "@/components/ui/carousel";

import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchSliders } from "@/lib/redux/slices/slider-slice";
import CoverSliderSkeleton from "@/components/skeletons/cover-slider-skel";
import { ErrorState } from "@/components/shared/error-state";

export default function CoverSlider() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.sliders);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  // Sort sliders by order 
  const sortedSliders = useMemo(() => {
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);

  if (loading) return <CoverSliderSkeleton />;

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchSliders())} />
    );

  return (
    <section className="relative" aria-label="Homepage cover slider">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {sortedSliders.map((item, index) => (
            <CarouselItem key={item.id}>
              <Image
                src={item.image}
                alt="cover image"
                width={1600}
                height={800}
                priority={index === 0} 
                className="w-full h-[25vh] md:h-[40vh] lg:h-[60vh] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots />
      </Carousel>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary-500 opacity-50" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-base-50 text-xl md:text-3xl lg:text-5xl font-bold">
          Resalet Farah foundation
        </h1>
      </div>
    </section>
  );
}
