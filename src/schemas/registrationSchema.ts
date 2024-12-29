import { z } from "zod";
import { loginSchema } from "./loginSchema";

export const registrationSchema = loginSchema
  .extend({
    name: z
      .string({ message: "name is a required field" })
      .min(2, { message: "name must contain atleast (2) characters" }),

    password: loginSchema.shape.password
      .min(8, {
        message: "passwords should be minimum 8 characters!",
      })
      .refine(
        (value) => {
          return value.match("^(?=.*?[A-Z])");
        },
        { message: "at least one Upper Case letter" }
      )
      .refine(
        (value) => {
          return value.match("^(?=.*?[a-z])");
        },
        { message: "at least one Lower Case letter" }
      )
      .refine(
        (value) => {
          return value.match("^(?=.*?[0-9])");
        },
        { message: "at least one Digit" }
      )
      .refine(
        (value) => {
          return value.match("^(?=.*?[#?!@$%^&*-])");
        },
        { message: "at least one special digit" }
      ),
    confirmPassword: z.string({ message: "password cannot be left emptpy!" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "passwords do not match!",
    path: ["confirmPassword"],
  });
