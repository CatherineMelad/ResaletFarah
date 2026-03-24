"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/shared/redux.hooks";
import { fetchContact } from "../../../lib/redux/slices/contact-slice";
import { ErrorState } from "@/components/shared/error-state";
import SocialLinks from "@/components/shared/social-links";
import { ContactDetailsSkeleton } from "@/components/skeletons/contact-skel";

export default function ContactDetails() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  if (loading) {
    return <ContactDetailsSkeleton />;
  }

  if (error)
    return (
      <ErrorState message={error} onRetry={() => dispatch(fetchContact())} />
    );
  return (
    <section className="py-16 px-5 md:px-20 text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Do you have any questions ?
      </h2>
      <p className="text-gray-500 mt-2 text-lg">Leave us a message</p>

      {/* Card */}
      <Card className="mt-10 rounded-2xl shadow-md">
        <CardContent className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-10">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-start gap-6 w-full md:w-1/2 text-left">
              {data.map((d) => (
                <div key={d.id} className="space-y-4">
                  {/* Address */}
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary-100 p-3 rounded-full">
                      <MapPin className="text-primary-500 w-5 h-5" />
                    </div>
                    <p className="text-gray-700">{d.address}</p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary-100 p-3 rounded-full">
                      <Mail className="text-primary-500 w-5 h-5" />
                    </div>
                    <p className="text-gray-700">{d.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary-100 p-3 rounded-full">
                      <Phone className="text-primary-500 w-5 h-5" />
                    </div>
                    <p className="text-gray-700">{d.phone}</p>
                  </div>

                  {/* Socials */}
                  <div className="pt-4">
                    <SocialLinks
                      links={{
                        facebook: d.facebook,
                        instagram: d.instagram,
                        linkedin: d.linkedin,
                        twitter: d.twitter,
                      }}
                      iconClassName="text-primary-500 h-7 w-7 mx-1"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/assets/Contact.png"
                alt="contact"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
