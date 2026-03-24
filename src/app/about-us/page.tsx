import PagesHeader from "@/components/shared/pages-header";
import Partners from "@/components/features/partners/partners";
import React from "react";
import AboutCards from "./_components/about-cards";

export default function AboutUs() {
  return (
    <div>
      <PagesHeader title={"Who We Are "} />
      <AboutCards />
      <Partners />
    </div>
  );
}
