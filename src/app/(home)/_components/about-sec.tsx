"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchAbout } from "../../../lib/redux/slices/about-slice";
import { ErrorState } from "@/components/shared/error-state";
import { Spinner } from "@/components/ui/spinner";

export default function AboutSec() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchAbout())} />
    );

  return (
    <div className="md:px-6 my-20 space-y-8 md:flex md:gap-10 lg:gap-24">
      <div className="relative">
        <Image
          src="/assets/Ornament 74.jpg"
          alt="Resalet Farah logo"
          width={180}
          height={180}
          className="absolute -left-50 md:-left-10 -top-7 lg:w-52 lg:h-52"
        />

        <Image
          src="/assets/English text.jpg"
          alt="Resalet Farah logo"
          width={250}
          height={250}
          className="relative z-10 shadow-[0_5px_40px_-15px_rgba(0,0,0,0.3)] m-auto w-60 h-60 lg:w-72 lg:h-72"
          priority
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="size-10 text-primary-500" />
        </div>
      ) : (
        <>
          {data.map((d) => (
            <div className="px-4 max-w-md lg:max-w-4xl" key={d.id}>
              <h1 className="text-primary-500 text-xl md:text-3xl lg:text-4xl font-bold">
                {d.title}
              </h1>
              <p className="text-base-900 text-sm md:text-md mt-3">
                {d.description}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
