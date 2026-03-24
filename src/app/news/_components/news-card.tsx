"use client";

import React, { useEffect } from "react";
import { fetchNews } from "@/lib/redux/slices/news-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import DynamicCard from "@/components/shared/dynamic-card";
import { ErrorState } from "@/components/shared/error-state";
import DynamicCardSkeleton from "@/components/skeletons/dynamic-card-skel";
import EmptyState from "@/components/shared/empty-state";

export default function NewsCard() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (error)
    return <ErrorState message={error} onRetry={() => dispatch(fetchNews())} />;

  if (loading) return <DynamicCardSkeleton />;

  if (!loading && (!data || data.length === 0)) {
    return (
      <EmptyState
        title="No news or events yet"
        description="Check back later for the latest news and upcoming events."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-14 px-5 md:px-20">
      {data.map((item) => (
        <article key={item.id}>
          {/* News Card*/}
          <DynamicCard
            image={item?.thumbnail}
            alt="news event"
            title={item?.title}
            href={`/news/${item.id}`}
          />
        </article>
      ))}
    </div>
  );
}
