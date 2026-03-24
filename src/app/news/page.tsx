import React from "react";
import PagesHeader from "@/components/shared/pages-header";
import NewsCard from "./_components/news-card";

export default function News() {
  return (
    <>
      <PagesHeader title={"Our News"} />
      <NewsCard />
    </>
  );
}
