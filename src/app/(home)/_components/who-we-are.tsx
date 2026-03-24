"use client";

import DynamicTitle from "@/components/shared/dynamic-title";
import { ErrorState } from "@/components/shared/error-state";
import WhoWeAreSkeleton from "@/components/skeletons/who-we-are-skel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchWhoWeAre } from "@/lib/redux/slices/who-we-are-slice";
import { getWhoWeAreIcon } from "@/lib/utils/who-we-are-Icon";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";

export default function WhoWeAre() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.whoWeAre);

  useEffect(() => {
    dispatch(fetchWhoWeAre());
  }, [dispatch]);

  // Sort sliders by order
  const sortedSliders = useMemo(() => {
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchWhoWeAre())} />
    );

  if (loading) {
    return <WhoWeAreSkeleton />;
  }

  if (!loading && (!data || data.length === 0)) {
    return null;
  }

  return (
    <section>
      <DynamicTitle title="Who We Are" />

      <div className="relative mt-10 lg:mt-20">
        <div
          className="
            hidden md:block
            h-[25vh] md:h-[40vh] lg:h-[60vh]
            bg-[url('/assets/img.jpg')]
            bg-cover bg-center bg-fixed
          "
          aria-hidden
        />

        <div className="md:absolute md:inset-0 bg-primary-500 opacity-50" />

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
          {sortedSliders.map((item) => {
            const Icon = getWhoWeAreIcon(item.title);
            return (
              <Link
                key={item.title}
                href="/about-us"
                aria-label={`Learn more about ${item.title}`}
              >
                <Card className="rounded-lg p-4 lg:p-6 h-52">
                  <CardTitle className="flex items-center gap-2 pb-2 text-primary-500 text-xl lg:text-2xl">
                    <Icon size={28} aria-hidden />
                    <h3>{item.title}</h3>
                  </CardTitle>

                  <CardContent className="p-0 text-sm lg:text-md line-clamp-6">
                    {item.description}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
