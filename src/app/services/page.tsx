import React from "react";
import PagesHeader from "@/components/shared/pages-header";
import ServicesCard from "./_components/services-card";

export default function Services() {
  return (
    <>
      <PagesHeader title={"Our Services"} />
      <ServicesCard />
    </>
  );
}
