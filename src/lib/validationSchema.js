import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const timeRegex = /^(0?[0-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)$/;

export const heroSectionSchema = z.object({
  title: z.string().min(1, "Title are required"),
  city: z.string().min(1, "Place are required"),
  image: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPEG, PNG, and JPG images are allowed"
    )
    .or(z.any()),
});

export const aboutSectionSchema = z.object({
  about: z.string().min(1, "About are required"),
  conferences: z.array(
    z.object({
      title: z.string().min(1, "Title are required"),
      conference_url: z.string().url("Invalid URL"),
    })
  ),
  where: z.string().min(1, "Where are required"),
  who: z.string().min(1, "Who are required"),
});

export const aboutConferenceSection = z.object({
  conferences: {
    title: z.string().min(1, "Title are required"),
    conference_url: z.string().url("Invalid URL"),
  },
});

export const scheduleItemSchema = z.object({
  timestart: z
    .string()
    .regex(timeRegex, "Invalid time format (use HH:MM AM/PM)"),
  timeend: z.string().regex(timeRegex, "Invalid time format (use HH:MM AM/PM)"),
  title: z.string().min(1, "Title is required"),
  speakers: z.string().min(1, "Speakers are required"),
  parallelsession: z.string().min(1, "Session is required"),
});

export const scheduleSectionSchema = z.object({
  date: z.coerce.date().min(new Date(), "Date must be in the future"),
  items: z
    .array(scheduleItemSchema)
    .min(1, "At least one schedule item is required"),
});

// Define schema for a single paper
export const paperSchema = z.object({
  paperId: z.string().regex(/^\d+$/, "Paper ID must be a numeric"),
  title: z.string().min(1, "Title is required"),
  authors: z.string().min(1, "Authors are required"),
  mode: z.enum(["Online", "Offline"]),
});

// Define schema for a single parallel session
export const parallelSessionSchema = z.object({
  date: z.date().min(new Date(), "Date must be in the future"),
  name: z.string().min(1, "Session name is required"),
});

export const speakersSectionSchema = z.object({
  name: z.string().min(1, "Name are required"),
  bio: z.string().min(1, "Bio are required"),
  image: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPEG, PNG, and JPG images are allowed"
      ),
    z.string().url("Invalid image").or(z.string().min(1, "Image is required")),
  ]),
});

export const locationSectionSchema = z.object({
  map_url: z.string().url("Invalid URL"),
});
