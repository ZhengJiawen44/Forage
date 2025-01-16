"use client";
import React, { FormEvent, useState } from "react";
import { BlogPreview, Editor } from "@/app/(components)";
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
import clsx from "clsx";
import truncateParagraph from "@/lib/truncateParagraph";
import getThumbnail from "@/lib/getThumbnail";
interface blogFormProps {
  title: string;
  length: number;
  description?: string;
  content: string;
  thumbnail: string | undefined;
}

const index = (blogContents?: blogFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  //form event state
  const [canPublish, setCanPublish] = useState<Boolean>(false);

  //error states and validation hook
  const [errors, setError] = useState<ZodIssue[] | undefined>(undefined);
  const { ref, title, length, content } = useValidate(errors);

  //preview visibillity and controlled form inputs
  const [displayPreview, setDisplayPreview] = useState<Boolean>(false);

  const [editorForm, setEditorForm] = useState<
    { [k: string]: FormDataEntryValue } | undefined
  >(undefined);

  const [description, setDescription] = useState<string | undefined>(
    blogContents?.description
  );
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    blogContents?.thumbnail
  );

  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  //ref to set the initial content of the Editor component
  const richText = useRef<string>(blogContents?.content);

  console.log(displayPreview);

  return (
    <div className="relative">
      <h1 className="font-extralight  m-auto text-[2rem] w-fit mb-10">
        write blog
      </h1>

      <form onSubmit={formSubmitHandler}>
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
            // onClick={(event) => formSubmitHandler(event)}
            className="text-[1rem] bg-[#84f4c1] text-[#000000] 
            font-sans font-bold border-none hover:bg-[#b5ffdd] flex items-center justify-center"
          >
            <AiOutlineLoading3Quarters
              className={loading ? "animate-spin" : "hidden"}
            />
            Next
          </Button>
        </div>
      </form>
      <BlogPreview
        display={displayPreview}
        setDisplay={setDisplayPreview}
        editorForm={editorForm!}
        description={description}
        setDesc={setDescription}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
    </div>
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

      //set the description
      if (!description) {
        setDescription(
          blogContents?.description ?? truncateParagraph(richText.current)
        );
      }

      //set the thumbnail
      if (!thumbnail) {
        setThumbnail(blogContents?.thumbnail ?? getThumbnail(richText.current));
      }

      setEditorForm({
        ...Object.fromEntries(new FormData(currTarget)),
        content: richText.current!,
      });
      //if validation success, open preview panel
      setDisplayPreview(true);
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
