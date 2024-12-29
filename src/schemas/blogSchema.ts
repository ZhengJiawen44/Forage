import { z } from "zod";
export const MAX_LENGTH = 20000;
export const blogSchema = z.object({
  title: z
    .string({ message: "title cannot be empty!" })
    .min(5, { message: "title cannot be less than 5 characters!" }),
  subtitle: z
    .string()
    .max(200, { message: "subtitles cannot be longer than 200 words" })
    .optional(),
  length: z.coerce.number({ message: "length cannot be a string!" }),

  content: z
    .string({ message: "content cannot be empty!" })
    .min(50, { message: "content cannot be less than 50 characters!" })
    .max(MAX_LENGTH, { message: "content cannot be over 20,000 characters!" }),
});
