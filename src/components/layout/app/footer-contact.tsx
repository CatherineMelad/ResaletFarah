"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/shared/redux.hooks";
import SocialLinks from "@/components/shared/social-links";
import { Spinner } from "@/components/ui/spinner";
import { fetchContact } from "@/lib/redux/slices/contact-slice";

export default function FooterContact() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  if (loading || (!data && !error)) {
    return <Spinner className="size-6 m-10" />;
  }

  if (error || !data) {
    return <p className="text-sm text-red-400">Failed to load data</p>;
  }

  return (
    <>
      {data?.map((d) => (
        <div key={d.id}>
          {/* Email & Phone */}
          <address className="not-italic">
            <ul className="mt-3 space-y-3">
              {d?.email && (
                <li>
                  <a
                    href={`mailto:${d?.email}`}
                    className="transition-colors hover:text-secondary-300"
                  >
                    {d?.email}
                  </a>
                </li>
              )}

              {d.phone && (
                <li>
                  <a
                    href={`tel:${d.phone}`}
                    className="transition-colors hover:text-secondary-300"
                  >
                    {d.phone}
                  </a>
                </li>
              )}
            </ul>
          </address>

          {/* Social Media */}
          <div className="mt-4">
            <h4 className="mb-2 text-lg font-semibold">Social media</h4>

            <SocialLinks
              links={{
                facebook: d.facebook,
                instagram: d.instagram,
                linkedin: d.linkedin,
                twitter: d.twitter,
              }}
              iconClassName="hover:text-secondary-300 transition"
            />
          </div>
        </div>
      ))}
    </>
  );
}
