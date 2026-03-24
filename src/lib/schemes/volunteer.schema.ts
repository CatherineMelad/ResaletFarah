import * as Yup from "yup";
import { VolunteerFormValues } from "../types/volunteer.types";

export const volunteerSchema: Yup.Schema<VolunteerFormValues> =
  Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    country: Yup.string().optional(),
    prefered_interest: Yup.string().optional(),
  });
