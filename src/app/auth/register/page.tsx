"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registrationSchema } from "@/schemas/registrationSchema";

import { Oauth } from "@/app/(components)";
import { FormToast } from "@/app/(components)";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/reusable-ui/form";
import { Input } from "@/app/(components)/reusable-ui/input";
import { Button } from "@/app/(components)/reusable-ui/button";
import Link from "next/link";

const Register = () => {
  const [message, setMessage] = useState("");
  const [isError, toggleIsError] = useState(false);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (formData: z.infer<typeof registrationSchema>) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      if (body.success) {
        setMessage(body.success);
        toggleIsError(false);
        console.log(body.success);
      } else {
        toggleIsError(true);
        setMessage(body.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[90%] sm:w-[60%] md:w-[60%]  bg-item
             px-5 md:px-16 py-4 sm:py-9 rounded-2xl grid gap-y-2 md:gap-y-5 m-auto
              border-item-foreground border-[1px] shadow-2xl shadow-black
               mb-6 sm:mb-0"
      >
        <h1 className="m-auto text-2xl sm:text-4xl">Signup</h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sm:text-[1rem]">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="h-9 sm:h-[2.5rem] rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sm:text-[1rem]">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-9 sm:h-[2.5rem] rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sm:text-[1rem]">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-9 sm:h-[2.5rem] rounded-lg"
                  {...field}
                  type="password"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sm:text-[1rem]">Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-9 sm:h-[2.5rem] rounded-lg"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-3 text-base rounded-md"
        >
          Register
        </Button>
        <Oauth />

        <FormToast message={message} isError={isError} />

        <p className="text-[0.8rem] sm:text-[1rem] m-auto text-item-foreground mt-4 ">
          already have an account?
          <Link href="login" className="hover:underline hover:text-white">
            {" Login"}
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Register;
