import React from "react";
import PagesHeader from "@/components/shared/pages-header";
import NewsDetails from "./_components/news-details";

export default function Page() {
  return (
    <>
      <PagesHeader title={"Our News"} />
      <NewsDetails />
    </>
  );
}
