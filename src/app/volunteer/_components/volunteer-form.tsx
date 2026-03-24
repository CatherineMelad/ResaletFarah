"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikHelpers } from "formik";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitVolunteer } from "@/app/volunteer/_actions/volunteer.actions";
import { VolunteerFormValues } from "@/lib/types/volunteer.types";
import { volunteerSchema } from "@/lib/schemes/volunteer.schema";
import { useToast } from "@/hooks/use-toast";

export default function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initialValues: VolunteerFormValues = {
    name: "",
    email: "",
    phone: "",
    country: "",
    prefered_interest: "",
  };

  async function handleVolunteerSubmit(
    values: VolunteerFormValues,
    { resetForm }: FormikHelpers<VolunteerFormValues>,
  ) {
    setLoading(true);
    try {
      const result = await submitVolunteer(values);
      if (result.success) {
        toast({
          title: "Application submitted",
          description: `Thank you for volunteering ♥️`,
        });
        resetForm();
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: result.message ?? "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-base-50/50 flex items-center justify-center wrapper py-10 md:py-15 lg:py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT – FORM */}
        <Card>
          <CardContent className="p-6 lg:p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={volunteerSchema}
              onSubmit={handleVolunteerSubmit}
            >
              {({ values, errors, touched, handleChange }) => (
                <Form
                  className={`space-y-5 ${
                    loading ? "pointer-events-none opacity-70" : ""
                  }`}
                >
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Darrell Steward"
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="tim.jennings@example.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Country</label>
                      <span className="text-xs text-muted-foreground">
                        Optional
                      </span>
                    </div>
                    <Input
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      placeholder="Egypt"
                    />
                  </div>

                  {/* Preferred Interest */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">
                        Preferred Interest
                      </label>
                      <span className="text-xs text-muted-foreground">
                        Optional
                      </span>
                    </div>
                    <Input
                      name="prefered_interest"
                      value={values.prefered_interest}
                      onChange={handleChange}
                      placeholder="Envirenment.."
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      placeholder="(405) 555-0128"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-700 hover:bg-primary-800 flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                    {loading ? "Submitting..." : "Next →"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* RIGHT – LOGO */}
        <Card className="hidden lg:flex items-center justify-center">
          <CardContent>
            <Image
              src="/assets/English text.jpg"
              alt="Resalet Farah Logo"
              width={400}
              height={400}
              priority
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
