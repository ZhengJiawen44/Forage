"use client";
import React, { FormEvent } from "react";
import { Editor } from "@/app/(components)";
import { useRef } from "react";
import { Button } from "../reusable-ui/button";
import Link from "next/link";
const index = () => {
  const richText = useRef<string>(`<p>how is your day</p>`);
  return (
    <>
      <h1 className="font-extralight  m-auto text-[2rem] w-fit mb-10">
        write a blog
      </h1>

      <form onSubmit={formSubmitHandler}>
        <div className="w-full flex gap-10 mb-6">
          <div className="grow-[10]">
            <label htmlFor="title" className="block">
              title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
          </div>
          <div className="grow-[1] ">
            <label htmlFor="length" className="block">
              length*
            </label>
            <input
              type="number"
              name="length"
              id="length"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="description" className="block">
            description
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full bg-transparent border-2 p-2 rounded-md"
          />
        </div>
        <Editor richText={richText} />
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

  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = { ...Object.fromEntries(data), content: richText.current };
    console.log(formData);
  }
};

export default index;
