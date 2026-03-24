import React from "react";
import CoverSlider from "./_components/cover-slider";
import AboutSec from "./_components/about-sec";
import WhoWeAre from "./_components/who-we-are";
import DirectorsSlide from "./_components/directors-slide";
import NewsSlide from "./_components/news-slide";
import Support from "./_components/support";
import Partners from "@/components/features/partners/partners";

export default function Home() {
  return (
    <>
      <CoverSlider />
      <AboutSec />
      <WhoWeAre />
      <DirectorsSlide />
      <NewsSlide />
      <Support />
      <Partners />
    </>
  );
}
