"use client";
import React, { FormEvent, useReducer, useState } from "react";
import { BlogPreview, Editor } from "@/app/(components)";
import { useRef } from "react";
import Link from "next/link";
import { blogSchema } from "@/schemas/blogSchema";
import { useToast } from "@/hooks/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useValidate } from "@/app/hooks/useValidate";
import { ZodIssue } from "zod";
import truncateParagraph from "@/lib/truncateParagraph";
import getThumbnail from "@/lib/getThumbnail";
interface blogFormProps {
  ID: string | undefined;
  title: string;
  length: number;
  description?: string;
  content: string;
  thumbnail: string | undefined;
}

const index = (blogContents?: blogFormProps) => {
  interface State {
    url: string | undefined;
  }
  interface Action {
    type: "changeURLRevoke" | "changeURL";
    newURL: string | undefined;
  }

  const { toast } = useToast();

  //error states and validation hook
  const [errors, setError] = useState<ZodIssue[] | undefined>(undefined);
  const { ref, title, length, content } = useValidate(errors);

  //preview visibillity and controlled form inputs
  const [displayPreview, setDisplayPreview] = useState<Boolean>(false);

  const [editorForm, setEditorForm] = useState<
    { title: string; length: string; content: string } | undefined
  >(undefined);

  const [description, setDescription] = useState<string | undefined>(
    blogContents?.description
  );

  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const [thumbnail, dispatchThumbnail] = useReducer(changeThumbnail, {
    url: blogContents?.thumbnail,
  });

  //ref to set the initial content of the Editor component
  const richText = useRef<string>(blogContents?.content);

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
          <button
            tabIndex={displayPreview ? -1 : 0}
            type="button"
            className=" bg-transparent px-3 py-1 rounded-3xl font-sans
            border flex items-center justify-center"
          >
            <Link href={"/"}>cancel</Link>
          </button>
          <button
            tabIndex={displayPreview ? -1 : 0}
            type="submit"
            // onClick={(event) => formSubmitHandler(event)}
            className=" bg-[#285000] px-3 py-1 rounded-3xl font-sans
            border-none flex items-center justify-center"
          >
            <AiOutlineLoading3Quarters
              className={loading ? "animate-spin" : "hidden"}
            />
            preview
          </button>
        </div>
      </form>
      <BlogPreview
        display={displayPreview}
        setDisplay={setDisplayPreview}
        editorForm={editorForm!}
        description={description}
        setDesc={setDescription}
        thumbnail={thumbnail}
        setThumbnail={dispatchThumbnail}
        ID={blogContents?.ID}
      />
    </div>
  );

  function changeThumbnail(state: State, action: Action) {
    switch (action.type) {
      case "changeURLRevoke":
        if (state.url && state.url.startsWith("blob:", 0)) {
          URL.revokeObjectURL(state.url);
        }
        break;
      case "changeURL":
        //do nothing
        break;
    }

    return { url: action.newURL };
  }

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
      if (!thumbnail.url) {
        dispatchThumbnail({
          type: "changeURL",
          newURL: blogContents?.thumbnail ?? getThumbnail(richText.current),
        });
      }

      const formData = new FormData(currTarget);
      setEditorForm({
        title: formData.get("title") as string,
        length: formData.get("length") as string,
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
