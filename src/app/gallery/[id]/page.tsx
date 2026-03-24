import PagesHeader from "@/components/shared/pages-header";
import React from "react";
import GalleryDetails from "./_components/gallery-details";

export default function GalleryImages() {
  return (
    <>
      <PagesHeader title={"Our Gallery"} />
      <GalleryDetails />
    </>
  );
}
