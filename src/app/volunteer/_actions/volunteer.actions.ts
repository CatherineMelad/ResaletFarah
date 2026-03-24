"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { VolunteerFormValues } from "@/lib/types/volunteer.types";

export interface ServerActionResponse {
  success: boolean;
  message?: string;
}

export async function submitVolunteer(
  payload: VolunteerFormValues
): Promise<ServerActionResponse> {
  try {
    const res = await fetch(
      `${process.env.API}/volunteers/create`,
      {
        method: "POST",
        headers: JSON_HEADER,
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message ?? "Submission failed");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unexpected error",
    };
  }
}