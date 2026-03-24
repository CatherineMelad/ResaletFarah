"use client";

import React, { useEffect } from "react";
import { fetchServices } from "@/lib/redux/slices/services-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import DynamicCard from "@/components/shared/dynamic-card";
import { ErrorState } from "@/components/shared/error-state";
import DynamicCardSkeleton from "@/components/skeletons/dynamic-card-skel";
import EmptyState from "@/components/shared/empty-state";

export default function ServicesCard() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (error)
    return <ErrorState message={error} onRetry={() => dispatch(fetchServices())} />;

  if (loading) return <DynamicCardSkeleton />;

  if (!loading && (!data || data.length === 0)) {
    return (
      <EmptyState
        title="No services yet"
        description="Check back later for programs and services we offer."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-14 px-5 md:px-20">
      {data.map((item) => (
        <article key={item.id}>
          {/* Services Card*/}
          <DynamicCard
            image={item?.image}
            alt="service"
            title={item?.name}
            href={`/services/${item.id}`}
          />
        </article>
      ))}
    </div>
  );
}
