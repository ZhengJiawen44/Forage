"use client";
import React, { createContext, FormEvent, useState } from "react";
import { Editor } from "@/app/(components)";
import { useRef } from "react";
import { Button } from "../reusable-ui/button";
import Link from "next/link";
import { blogSchema } from "@/schemas/blogSchema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/lib/image-upload/uploadImage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FileContextType {
  files: React.RefObject<File[]>;
}

export const fileContext = createContext<FileContextType | undefined>(
  undefined
);
const index = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [lengthError, setLengthError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const richText = useRef<string>(`<p>how is your day</p>`);
  const files = useRef<File[]>([]);

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
            description/subtitle
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full bg-transparent border-2 p-2 rounded-md"
          />
          <p>{descError}</p>
        </div>
        <fileContext.Provider value={{ files }}>
          <Editor richText={richText} error={contentError} />
        </fileContext.Provider>

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
            className="text-[1rem] bg-[#84f4c1] text-[#000000] 
            font-sans font-bold border-none hover:bg-[#b5ffdd] flex items-center justify-center"
          >
            <AiOutlineLoading3Quarters
              className={loading ? "animate-spin" : "hidden"}
            />
            Submit
          </Button>
        </div>
      </form>
    </>
  );

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    //error handling for form data validation
    event.preventDefault();
    setTitleError(null);
    setLengthError(null);
    setDescError(null);
    setContentError(null);
    const data = new FormData(event.currentTarget);
    try {
      setLoading(true);
      //first Post image to AWS S3
      //upload all images in the editor to aws S3 bucket
      const upload = await uploadImage(richText.current, files.current);
      if (!upload?.success) {
        console.log("not success");
        console.log(upload?.message);
        toast({ title: upload!.message });
        return;
      }
      const html = upload.html;
      toast({ title: upload!.message });

      const formData = { ...Object.fromEntries(data), content: html };
      const parseResult = blogSchema.safeParse(formData);
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
        return;
      }

      if (parseResult.success) {
        //POST form data to blog api endpoint
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parseResult.data),
        });
        if (!res.ok) {
          const { error } = await res.json();
          toast({ title: `server responded with ${res.status} error` });
          console.log(error);
          return;
        }
        toast({
          title: "Blog created",
          description: "you blog has been created and uploaded succesfully!",
        });
        router.push("/");
      }
    } catch (error) {
      toast({ title: "unable to submit blog" });
      console.log(error);
      return;
    } finally {
      setLoading(false);
    }
  }
};

export default index;
