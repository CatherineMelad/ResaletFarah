"use client";

import { ErrorState } from "@/components/shared/error-state";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchGallery } from "@/lib/redux/slices/gallery-slice";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import GalleryDetailsSkeleton from "@/components/skeletons/gallery-skel";

export default function GalleryFolders() {
  //Hooks
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return <GalleryDetailsSkeleton />;
  }

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchGallery())} />
    );

  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return null;
  }
  return (
    <section className="pb-14 px-5 md:px-20">
      {/* SEO heading (hidden visually but important) */}
      <h1 className="sr-only">Gallery News</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            className="group relative block overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px]">
              <Image
                src={item.thumbnail || "/fallback.jpg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw,
                       (max-width: 1024px) 33vw,
                       25vw"
                priority={false}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Title */}
            <div className="absolute bottom-3 left-3 right-3">
              <h2 className="text-white text-sm sm:text-base font-semibold leading-snug">
                {item.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
