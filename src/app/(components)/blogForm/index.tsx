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
import { useValidate } from "@/app/hooks/useValidate";
import { ZodIssue } from "zod";

// interface FileContextType {
//   files: React.RefObject<File[]>;
// }
// //this is the context for the domImage file
// export const fileContext = createContext<FileContextType | undefined>(
//   undefined
// );

interface blogFormProps {
  title: string;
  length: number;
  description?: string;
  content: string;
  thumbnail: string | null;
}

const index = (blogContents?: blogFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [errors, setError] = useState<ZodIssue[] | undefined>(undefined);
  const { ref, title, length, description, content } = useValidate(errors);

  // const [titleError, setTitleError] = useState<string | null>(null);
  // const [lengthError, setLengthError] = useState<string | null>(null);
  // const [descError, setDescError] = useState<string | null>(null);
  // const [contentError, setContentError] = useState<string | null>(null);
  // //ref to auto focus on error
  // const titleRef = useRef<HTMLInputElement | null>(null);
  // const lengthRef = useRef<HTMLInputElement | null>(null);
  // const descRef = useRef<HTMLTextAreaElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  //ref to set the initial content of the Editor component
  const richText = useRef<string>(blogContents?.content);

  //context ref to record all files to diff against domImage
  // const files = useRef<File[]>([]);

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
              ref={ref.titleRef}
              onChange={(e) => {
                if (isSubmit) {
                  const error = blogSchema.shape.title.safeParse(
                    e.currentTarget.value
                  ).error?.errors[0];

                  if (!error) {
                    title.setTitleError(null);
                    return;
                  }

                  title.setTitleError(error.message);
                }
              }}
              defaultValue={blogContents?.title}
              type="text"
              name="title"
              id="title"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
            <p>{title.titleError}</p>
          </div>
          <div className="grow-[1] ">
            <label htmlFor="length" className="block text-item-foreground">
              length*
            </label>
            <input
              ref={ref.lengthRef}
              onChange={(e) => {
                if (isSubmit) {
                  const error = blogSchema.shape.length.safeParse(
                    e.currentTarget.value
                  ).error?.errors[0];

                  if (!error) {
                    length.setLengthError(null);
                    return;
                  }
                  length.setLengthError(error.message);
                }
              }}
              defaultValue={blogContents?.length}
              type="number"
              name="length"
              id="length"
              className="w-full bg-transparent border-2 p-1 rounded-md"
            />
            <p>{length.lengthError}</p>
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="description" className="block text-item-foreground">
            description/subtitle
          </label>
          <textarea
            ref={ref.descRef}
            onChange={(e) => {
              if (isSubmit) {
                const error = blogSchema.shape.description.safeParse(
                  e.currentTarget.value
                ).error?.errors[0];

                if (!error) {
                  description.setDescError(null);
                  return;
                }
                description.setDescError(error.message);
              }
            }}
            defaultValue={blogContents?.description}
            name="description"
            id="description"
            className="w-full bg-transparent border-2 p-2 rounded-md"
          />
          <p>{description.descError}</p>
        </div>
        {/* <fileContext.Provider value={{ files }}> */}
        <Editor richText={richText} error={content.contentError} />
        {/* </fileContext.Provider> */}

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

    setSubmit(true);
    //collect the form data and validate data
    const formData = new FormData(event.currentTarget);
    formData.append("content", richText.current ?? "");

    const parseResult = blogSchema.safeParse(Object.fromEntries(formData));
    console.log(parseResult.error);

    if (!parseResult.success) {
      const { errors } = parseResult.error;
      //trigger custom useValidate hook to revalidate inputs
      setError(errors);
      return;
    }

    // setSubmit(true);
    // const data = new FormData(event.currentTarget);
    // try {
    //   setLoading(true);
    //   //first Post image to AWS S3
    //   //upload all images in the editor to aws S3 bucket
    //   const upload = await uploadImage(richText.current, files.current);

    //   if (!upload?.success) {
    //     console.log("not success");
    //     console.log(upload?.message);
    //     toast({ title: upload!.message });
    //     return;
    //   }
    //   // toast({ title: "image uploaded" });
    //   const html = upload.html;
    //   const formData = {
    //     ...Object.fromEntries(data),
    //     content: html,
    //     thumbnail: upload.thumbnail ?? blogContents?.thumbnail,
    //   };
    //   // console.log(formData);

    //   const parseResult = blogSchema.safeParse(formData);
    //   console.log(parseResult);

    //   if (!parseResult.success) {
    //     const { errors } = parseResult.error;
    //     let focus = false;
    //     errors.forEach(({ message, path }) => {
    //       switch (path[0]) {
    //         case "title":
    //           setTitleError(message);
    //           if (focus === false) {
    //             titleRef.current?.focus();
    //             focus = true;
    //           }

    //           break;
    //         case "length":
    //           setLengthError(message);
    //           if (focus === false) {
    //             lengthRef.current?.focus();
    //             focus = true;
    //           }

    //           break;
    //         case "description":
    //           descRef.current?.focus();

    //           if (focus === false) {
    //             setDescError(message);
    //           }
    //           break;
    //         case "content":
    //           setContentError(message);
    //           break;
    //       }
    //     });
    //     console.log("here");
    //     return;
    //   }

    //   if (parseResult.success) {
    //     //POST form data to blog api endpoint
    //     const res = await fetch("/api/blog", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(formData),
    //     });
    //     if (!res.ok) {
    //       const { error } = await res.json();
    //       toast({ title: `server responded with ${res.status} error` });
    //       console.log(error);
    //       return;
    //     }
    //     toast({
    //       title: "Blog created",
    //       description: "you blog has been created and uploaded succesfully!",
    //     });
    //     router.push("/");
    //   }
    // } catch (error) {
    //   toast({ title: "unable to submit blog" });
    //   console.log(error);
    //   return;
    // } finally {
    //   setLoading(false);
    // }
  }
};

export default index;
