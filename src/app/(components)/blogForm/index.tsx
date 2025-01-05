"use client";
import React, { FormEvent, useState } from "react";
import { Editor } from "@/app/(components)";
import { useRef } from "react";
import { Button } from "../reusable-ui/button";
import Link from "next/link";
import { blogSchema } from "@/schemas/blogSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const index = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [lengthError, setLengthError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const richText = useRef<string>(`<p>how is your day</p>`);
  return (
    <>
      <h1 className="font-extralight  m-auto text-[2rem] w-fit mb-10">
        write blog
      </h1>

      <form onSubmit={formSubmitHandler}>
        <div className="w-full flex gap-10 mb-6">
          <div className="grow-[10]">
            <label htmlFor="title" className="block text-item-foreground">
              title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
            <p>{titleError}</p>
          </div>
          <div className="grow-[1] ">
            <label htmlFor="length" className="block text-item-foreground">
              length*
            </label>
            <input
              type="number"
              name="length"
              id="length"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
            <p>{lengthError}</p>
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="description" className="block text-item-foreground">
            description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full bg-transparent border-2 p-2 rounded-md"
          />
          <p>{descError}</p>
        </div>
        <Editor richText={richText} error={contentError} />
        <div className="flex gap-4 mt-4 justify-end">
          <Button
            type="button"
            asChild
            className="text-[1rem] font-sans font-bold"
            variant={"outline"}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="text-[1rem] bg-[#84f4c1] text-[#000000] font-sans font-bold border-none hover:bg-[#b5ffdd]"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitleError(null);
    setLengthError(null);
    setDescError(null);
    setContentError(null);
    const data = new FormData(event.currentTarget);
    const formData = { ...Object.fromEntries(data), content: richText.current };
    const parseResult = blogSchema.safeParse(formData);

    if (parseResult.success) {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data),
      });

      if (res.ok) {
        toast({
          title: "Blog created",
          description: "you blog has been created and uploaded succesfully!",
        });
        router.push("/");
      } else {
        const { error } = await res.json();
        toast({ title: error });
      }
    }

    if (!parseResult.success) {
      const { errors } = parseResult.error;
      errors.forEach(({ message, path }) => {
        switch (path[0]) {
          case "title":
            setTitleError(message);
            break;
          case "length":
            setLengthError(message);
            break;
          case "description":
            setDescError(message);
            break;
          case "content":
            setContentError(message);
            break;
        }
      });
    }
  }
};

export default index;
