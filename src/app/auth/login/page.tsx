"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { Button } from "@/app/(components)/reusable-ui/button";
import { Oauth } from "@/app/(components)";
import { FormToast } from "@/app/(components)";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(components)/reusable-ui/form";
import { Input } from "@/app/(components)/reusable-ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, toggleIsError] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await response.json();
      if (body.success) {
        toggleIsError(false);
        setMessage(body.success);
        console.log(body.success);
        router.push("/?refresh=true");
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
        className="w-[90%] sm:w-[60%] md:w-[60%] bg-item m-auto
             px-5 md:px-16 py-9 rounded-2xl grid gap-y-2 md:gap-y-7 border-item-foreground
              border-[1px] shadow-2xl shadow-black mb-6 sm:mb-0"
      >
        <h1 className="m-auto text-2xl sm:text-4xl">Login</h1>
        <p className="m-auto opacity-55 text-md">Welcome back</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[1rem]">Email</FormLabel>
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
              <FormLabel className="text-[1rem]">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  className="h-9 sm:h-[2.5rem] rounded-lg"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>
                <a href="/" className="underline">
                  forgot password?
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-3 text-base rounded-lg "
        >
          Login
        </Button>
        {message !== "" ? (
          <FormToast message={message} isError={isError} />
        ) : (
          ""
        )}

        <Oauth />

        <p className="text-[0.8rem] sm:text-[1rem] m-auto text-item-foreground mt-4 ">
          dont have an account?
          <Link href="register" className="hover:underline hover:text-white">
            {" Register"}
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Login;
