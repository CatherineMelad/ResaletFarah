import React from "react";
import PagesHeader from "@/components/shared/pages-header";
import ServiceDetails from "./_components/service-details";

export default function Page() {
  return (
    <>
      <PagesHeader title={"Our Service"} />
      <ServiceDetails />
    </>
  );
}
