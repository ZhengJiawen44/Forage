"use client";
import React, { FormEvent, useState } from "react";
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
import { BlogPreview } from "@/app/(components)";
import truncateParagraph from "@/lib/truncateParagraph";
import getThumbnail from "@/lib/getThumbnail";
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

  //error states and validation hook
  const [errors, setError] = useState<ZodIssue[] | undefined>(undefined);
  const { ref, title, length, content } = useValidate(errors);

  //preview visibillity
  const [displayPreview, setDisplayPreview] = useState<Boolean>(false);

  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  //ref to set the initial content of the Editor component
  const richText = useRef<string>(blogContents?.content);

  return (
    <>
      <h1 className="font-extralight  m-auto text-[2rem] w-fit mb-10">
        write blog
      </h1>

      <form onSubmit={formSubmitHandler} className="relative">
        <div className="w-full flex gap-10 mb-10">
          <div className="grow-[10]">
            <label htmlFor="title" className="block text-item-foreground">
              title*
            </label>
            <input
              tabIndex={displayPreview ? -1 : 0}
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
              tabIndex={displayPreview ? -1 : 0}
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

        <Editor
          richText={richText}
          error={content.contentError}
          tab={displayPreview ? -1 : 0}
        />

        <div className="flex gap-4 mt-4 justify-end">
          <Button
            tabIndex={displayPreview ? -1 : 0}
            type="button"
            asChild
            className="text-[1rem] font-sans font-bold"
            variant={"outline"}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            tabIndex={displayPreview ? -1 : 0}
            type="submit"
            // onClick={() => setDisplayPreview(!displayPreview)}
            className="text-[1rem] bg-[#84f4c1] text-[#000000] 
            font-sans font-bold border-none hover:bg-[#b5ffdd] flex items-center justify-center"
          >
            <AiOutlineLoading3Quarters
              className={loading ? "animate-spin" : "hidden"}
            />
            Next
          </Button>
        </div>
        <BlogPreview
          display={displayPreview}
          setDisplay={setDisplayPreview}
          description={
            blogContents?.description ?? truncateParagraph(richText.current)
          }
          thumbnail={blogContents?.thumbnail ?? getThumbnail(richText.current)}
        />
      </form>
    </>
  );

  async function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    //error handling for form data validation
    event.preventDefault();
    const currTarget = event.currentTarget;
    try {
      setLoading(true);
      setSubmit(true);

      const isValid = await validate(currTarget);
      if (!isValid) {
        return;
      }

      //if validation success, open preview panel
      setDisplayPreview(true);

      //if validation success, upload all images to aws s3
      // const upload = await uploadImage(richText.current!);

      // if (!upload.success) {
      //   console.log(upload?.message);
      //   toast({ title: upload.message });
      //   return;
      // }
      // console.log(upload.message);

      // //if image is uploaded, construct new form data with the new content
      // const html = upload.html;
      // const formDataObject = {
      //   ...Object.fromEntries(new FormData(currTarget)),
      //   content: html,
      //   thumbnail: upload.thumbnail ?? blogContents?.thumbnail,
      // };
      // // POST form data to blog api endpoint
      // const res = await fetch("/api/blog", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formDataObject),
      // });
      // if (!res.ok) {
      //   const { error } = await res.json();
      //   toast({ title: `server responded with ${res.status} error` });
      //   console.log(error);
      //   return;
      // }
      // toast({
      //   title: "Blog created",
      //   description: "you blog has been created and uploaded succesfully!",
      // });
      // router.push("/");
    } catch (error) {
      console.log(error);
      toast({ title: "could not upload your blog" });
    } finally {
      setLoading(false);
    }
  }

  async function validate(currTarget: HTMLFormElement | undefined) {
    //collect the form data and validate data
    const formData = new FormData(currTarget);
    formData.append("content", richText.current ?? "");
    const parseResult = blogSchema.safeParse(Object.fromEntries(formData));
    if (!parseResult.success) {
      const { errors } = parseResult.error;
      //trigger custom useValidate hook to revalidate inputs
      setError(errors);
      return false;
    }
    return true;
  }
};

export default index;
