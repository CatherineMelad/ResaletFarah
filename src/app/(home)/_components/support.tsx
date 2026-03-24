import DynamicTitle from "@/components/shared/dynamic-title";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeartHandshake, HandHeart } from "lucide-react";
import React from "react";

const SUPPORT_OPTIONS = [
  {
    title: "Donate to help us move forward.",
    icon: HandHeart,
    href: "/donate",
  },
  {
    title: "Join us now and volunteer.",
    icon: HeartHandshake,
    href: "/volunteer",
  },
];

export default function Support() {
  return (
    <section
      className="px-14 lg:px-20 py-10 md:py-15 lg:py-20 bg-gradient-to-b from-[#045FC8] to-[#034896]"
      aria-labelledby="support-heading"
    >
      <DynamicTitle
        className="text-white"
        title="How to Support?"
      />

      <div className="mt-5 md:mt-10 flex flex-col md:flex-row items-center justify-around gap-5">
        {SUPPORT_OPTIONS.map(({ title, icon: Icon, href }) => (
          <article key={title}>
            <Card>
              <CardHeader>
                <Icon
                  size={100}
                  className="text-primary-600 mx-auto"
                  aria-hidden="true"
                />
              </CardHeader>

              <CardContent className="lg:max-w-xs md:max-w-[17rem]">
                <p className="text-center text-base-800 text-2xl lg:text-3xl">
                  {title}
                </p>
              </CardContent>

              <CardFooter>
                <Link href={href} className="w-full">
                  <Button className="w-full bg-primary-700">
                    Learn more
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}