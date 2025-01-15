import { z } from "zod";
export const MAX_LENGTH = 20000;
export const blogSchema = z.object({
  title: z
    .string({ message: "title cannot be empty!" })
    .min(5, { message: "title cannot be less than 5 characters!" })
    .max(50, { message: "title cannot be less than 5 characters!" }),
  description: z
    .string()
    .max(203, { message: "description cannot be longer than 200 words" })
    .optional(),
  length: z.coerce
    .number({ message: "length should be a!" })
    .min(1, { message: "length should not be less than 1" }),
  thumbnail: z.string({ message: "thumbnail is a string" }).optional(),
  content: z
    .string({ message: "content cannot be empty!" })
    .min(50, { message: "content cannot be less than 50 characters!" })
    .max(MAX_LENGTH, {
      message: `content cannot be over ${MAX_LENGTH} characters!`,
    }),
});
