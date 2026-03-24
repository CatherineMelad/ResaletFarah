import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

type GalleryBannerProps = {
  galleryHref: string;
  title?: string;
  buttonLabel?: string;
};

export default function GalleryBanner({
  galleryHref,
  title = "Check our gallery for this event",
  buttonLabel = "Our Gallery",
}: GalleryBannerProps) {
  return (
    <section className="w-full bg-white rounded-xl flex flex-col md:flex-row items-center lg:gap-10 justify-center">
      {/* Illustration */}
      <div className="relative w-60 md:w-[30rem] h-60 md:h-[30rem]">
        <Image
          src="/assets/gallery.png"
          alt="gallery illustration"
          fill
          className="object-contain"
        />
      </div>

      {/* Text + Button */}
      <div className="flex flex-col items-center sm:items-start gap-5 text-center max-w-xs">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-700 leading-snug">
          {title}
        </h2>

        <Link className=" mx-auto" href={galleryHref}>
          <Button className="px-10">
            {buttonLabel}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
