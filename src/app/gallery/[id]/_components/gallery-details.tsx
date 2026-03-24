"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchSingleGallery } from "@/lib/redux/slices/gallery-slice";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GalleryDetailsSkeleton from "@/components/skeletons/gallery-skel";
import EmptyState from "@/components/shared/empty-state";

export default function GalleryDetails() {
  //Hooks
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dispatch = useAppDispatch();
  const { selected, loading } = useAppSelector((s) => s.gallery);

  useEffect(() => {
    if (id) dispatch(fetchSingleGallery(Number(id)));
  }, [id, dispatch]);

  // Loading state
  if (loading) {
    return <GalleryDetailsSkeleton />;
  }
  // Empty state
  if (!selected || selected.images.length === 0) {
    return (
      <EmptyState
        title="No images in this gallery"
        description="Check back later or explore other galleries."
      />
    );
  }

  return (
    <section className="pb-14 px-5 md:px-20">
      <h1 className="inline-block text-2xl font-semibold capitalize text-primary-500 lg:text-4xl mb-4 lg:mb-6">
        {selected.title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {selected.images.map((img, index) => (
          <div
            key={img.id}
            onClick={() => {
              setSelectedIndex(index);
              setOpen(true);
            }}
            className="relative w-full h-[220px] md:h-[260px] bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
          >
            <Image
              src={img.image_path}
              alt={selected.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw,
           (max-width: 1200px) 33vw,
           25vw"
            />
          </div>
        ))}
      </div>
      {/* Images Carousel */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 bg-white border-none">
          <Carousel
            opts={{
              startIndex: selectedIndex,
            }}
            className="w-full"
          >
            <CarouselContent>
              {selected.images.map((img) => (
                <CarouselItem key={img.id}>
                  <div className="relative h-[70vh] flex items-center justify-center">
                    <Image
                      src={img.image_path}
                      alt={selected.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls */}
            <CarouselPrevious
              aria-label="Previous slide"
              className="bg-primary-50 hover:bg-primary-100 text-primary-700 left-4"
            />

            <CarouselNext
              aria-label="Next slide"
              className="bg-primary-50 hover:bg-primary-100 text-primary-700 right-4"
            />
          </Carousel>
        </DialogContent>
      </Dialog>
    </section>
  );
}
