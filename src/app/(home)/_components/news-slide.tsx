"use client";

import DynamicTitle from "@/components/shared/dynamic-title";
import DynamicCard from "@/components/shared/dynamic-card";
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
import { fetchNews } from "@/lib/redux/slices/news-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { ErrorState } from "@/components/shared/error-state";
import NewsSlideSkeleton from "@/components/skeletons/news-slide-skel";

export default function NewsSlide() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  if (error)
    return <ErrorState message={error} onRetry={() => dispatch(fetchNews())} />;

  if (loading) return <NewsSlideSkeleton />;

  if (!loading && (!data || data.length === 0)) {
    return null;
  }

  return (
    <section
      className="px-14 lg:px-20 py-10 md:py-15 lg:py-20 relative"
      aria-labelledby="news-heading"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          alt=""
          fill
          className="object-cover opacity-70 pt-20 pb-5 lg:pt-36 lg:pb-8"
          src={"/assets/Ornament 76.jpg"}
          priority={false}
        />
      </div>
      <div className="relative z-10">
        <DynamicTitle title="latest news & activities" />

        <Carousel
          className="relative mt-5 md:mt-10"
          opts={{ loop: true, align: "start" }}
          plugins={[autoplayPlugin]}
          role="region"
          aria-roledescription="carousel"
          aria-label="Board of Directors carousel"
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  {/* News Card*/}
                  <DynamicCard
                    image={item?.thumbnail}
                    alt="news event"
                    title={item?.title}
                    href="/news"
                  />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous slide"
            className="bg-primary-50 hover:bg-primary-100 text-primary-700"
          />

          <CarouselNext
            aria-label="Next slide"
            className="bg-primary-50 hover:bg-primary-100 text-primary-700"
          />
        </Carousel>
      </div>
    </section>
  );
}
