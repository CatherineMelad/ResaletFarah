"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchSingleNews } from "@/lib/redux/slices/news-slice";
import Image from "next/image";
import EmptyState from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import GalleryBanner from "@/components/shared/gallery-banner";
import NewsDetailsSkeleton from "@/components/skeletons/news-details-skel";

export default function NewsDetails() {
  //Hooks
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selected, loading, error } = useAppSelector((s) => s.news);

  useEffect(() => {
    if (id) dispatch(fetchSingleNews(Number(id)));
  }, [id, dispatch]);

  //Loading
  if (loading) return <NewsDetailsSkeleton />;

  //Error
  if (error)
    return (
      <ErrorState
        message={error}
        onRetry={() => dispatch(fetchSingleNews(Number(id)))}
      />
    );

  //Empty
  if (!selected)
    return (
      <EmptyState
        title="News not found"
        description="This article doesn't exist or has been removed."
      />
    );

  return (
    <article className="pb-14 md:pb-0 px-5 md:px-20 flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-600 leading-snug">
        {selected.title}
      </h1>

      {/* Thumbnail */}
      {selected.thumbnail && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src={selected.thumbnail}
            alt={selected.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Description */}
      {selected.description && (
        <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
          {selected.description}
        </p>
      )}
      <GalleryBanner galleryHref={`/gallery/${selected.id}`} />
    </article>
  );
}
