import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ message: "email cannot be left empty!" })
    .email({ message: "please provide a valid email" }),
  password: z
    .string({ message: "passsword cannot be left emptpy!" })
    .min(1, { message: "password is a required field!" }),
});
