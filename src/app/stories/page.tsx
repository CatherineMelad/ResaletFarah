import PagesHeader from "@/components/shared/pages-header";
import React from "react";
import StoriesCards from "./_components/stories-cards";

export default function Stories() {
  return (
    <div>
      <PagesHeader title={"Success Stories"} />
      <StoriesCards />
    </div>
  );
}
