import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const aboutSectionSchema = z.object({
  about: z.string().min(10, "About must be at least 10 characters long"),
  scope: z.string().min(5, "Scope must be at least 5 characters long"),
  where: z.string().min(3, "Where must be at least 3 characters long"),
  when: z.string().min(5, "When must be at least 5 characters long"),
  who: z.string().min(5, "Who must be at least 5 characters long"),
});

export const heroSectionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  place: z.string().min(5, "Place must be at least 5 characters long"),
  date: z.date().min(new Date(), "Date must be in the future"),
  image: z.any().refine((value) => ACCEPTED_IMAGE_TYPES.includes(value.type), {
    message: "Only JPEG, PNG, and JPG images are allowed",
  }),
});

export const scheduleSectionSchema = z.object({
  date: z.date().min(new Date(), "Date must be in the future"),
  timestart: z.string().time({ message: "Invalid time format" }),
  timeend: z.string().time({ message: "Invalid time format" }),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  speakers: z.string().min(5, "Speakers must be at least 5 characters long"),
});

export const speakersSectionSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  bio: z.string().min(5, "Bio must be at least 5 characters long"),
  image: z.any().refine((value) => ACCEPTED_IMAGE_TYPES.includes(value.type), {
    message: "Only JPEG, PNG, and JPG images are allowed",
  }),
});

export const locationSecntionSchema = z.object({
  map_url: z.string.url("Invalid URL"),
});
