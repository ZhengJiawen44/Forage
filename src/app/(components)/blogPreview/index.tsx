"use client";
import React, { FormEvent, useState } from "react";
import uploadThumbnail from "@/lib/image-upload/uploadThumbnail";
import { CompressImage } from "@/lib/imageCompression/compressImage";
import { uploadToS3 } from "@/lib/image-upload/S3upload";
import { uploadImage } from "@/lib/image-upload/uploadImage";
import { BsXLg } from "react-icons/bs";
import { useToast } from "@/hooks/use-toast";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
interface Action {
  type: "changeURL";
  newURL: string | undefined;
}
interface blogPreviewProps {
  ID: string | undefined;
  display: Boolean;
  setDisplay: React.Dispatch<React.SetStateAction<Boolean>>;
  editorForm: { title: string; length: string; content: string };
  description?: string;
  setDesc: React.Dispatch<React.SetStateAction<string | undefined>>;
  thumbnail: { url: string | undefined };
  setThumbnail: React.ActionDispatch<[action: Action]>;
}
const index = ({
  display,
  setDisplay,
  editorForm,
  description,
  setDesc,
  thumbnail,
  setThumbnail,
  ID,
}: blogPreviewProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(description?.length);
  if (!display) {
    return;
  }

  return (
    <div className="absolute inset-0 top-0 left-0 z-10 bg-item lg:bg-background">
      <form onSubmit={handlePublish}>
        <div className="flex gap-4 lg:gap-9 h-fit my-8 sm:border px-4 sm:px-8 pt-8 rounded-lg">
          <div className="relative w-[70%] md:w-[80%] xl:w-[77%] pb-8">
            <h1 className="text-[1.6rem] font-bold mb-2">{editorForm.title}</h1>
            <textarea
              className="focus:outline-none resize-none w-full bg-item lg:bg-background h-fit 
            scrollbar-thumb-black lg:scrollbar-thumb-item scrollbar-thin scrollbar-track-transparent  text-[0.8rem] lg:text-[1rem]"
              id="description"
              name="description"
              value={description}
              maxLength={200}
              placeholder="Enter a short description of your story"
              onChange={(e) => {
                setDesc(e.target.value);
                setWordCount(e.target.value.length);
              }}
            ></textarea>
            <p className="absolute left-1 bottom-1 text-sm text-item-foreground">
              {wordCount ? wordCount : 0}/200
            </p>
          </div>

          <div className=" w-[30%] md:w-[20%] xl:w-[23%] hover:scale-110 transition-all duration-300">
            <div className="relative w-full aspect-video border rounded-md">
              <img
                className="rounded-lg object-cover aspect-video"
                src={thumbnail.url}
              />
              <BsXLg
                strokeWidth={1.5}
                className={
                  thumbnail.url
                    ? "w-3 h-3 md:w-4 md:h-4 absolute top-1 right-1 hover:cursor-pointer hover:text-white hover:rotate-90 transition-all duration-[400ms]"
                    : "hidden"
                }
                onClick={() =>
                  setThumbnail({ type: "changeURL", newURL: undefined })
                }
              />
              <label
                htmlFor="thumbnail"
                className=" absolute bottom-[50%] right-[50%] translate-x-1/2 translate-y-1/2
           bg-black bg-opacity-80 w-fit py-1 px-1 md:px-4 rounded-3xl text-sm md:text-[0.9rem] text-item-foreground whitespace-nowrap hover:text-white hover:cursor-pointer
               transition-all duration-300"
              >
                New Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                name="thumbnail"
                onChange={(e) => {
                  if (e.target.files) {
                    const url = URL.createObjectURL(e.target.files![0]);
                    setThumbnail({ type: "changeURL", newURL: url });
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            className="border-item border p-4 px-3 py-1  rounded-3xl font-sans"
            type="button"
            onClick={() => setDisplay((display) => !display)}
          >
            Back
          </button>
          <button
            className="bg-[#285000] px-3 py-1 rounded-3xl font-sans flex items-center justify-between "
            type="submit"
          >
            <ImSpinner8
              className={submitting ? "animate-spin mr-3" : "hidden"}
            />
            <p>publish</p>
          </button>
        </div>
      </form>
    </div>
  );
  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      //first upload the thumbnail to aws s3 (if any)
      let formThumbnail = undefined;
      if (thumbnail.url && thumbnail.url.startsWith("blob:")) {
        const thumbnailRes = await uploadThumbnail(thumbnail.url);
        if (thumbnailRes?.URL) {
          const thumbnailFile = await fetch(thumbnail.url);
          const blob = await thumbnailFile.blob();
          const file = new File([blob], "thumbnail", { type: blob.type });
          const cFile = await CompressImage(file);
          const body = await uploadToS3(thumbnailRes.URL, cFile);
          if (!body) {
            console.log("thumbnail could not be uploaded");
            return;
          }
          formThumbnail = `https://aws-blogs-images.s3.ap-southeast-1.amazonaws.com/${thumbnailRes.UUID}`;
          console.log(formThumbnail);
        }
      }
      //upload all images in editor to aws s3
      const upload = await uploadImage(editorForm.content.toString());

      if (!upload.success) {
        console.log(upload?.message);
        toast({ title: upload.message });
        return;
      }
      console.log(upload.message);

      // collect all data into a form
      editorForm.content;
      const finalForm = {
        title: editorForm.title,
        length: editorForm.length,
        content: upload.html,
        thumbnail: formThumbnail,
        description,
      };
      if (ID) {
        updateForm(finalForm);
      } else {
        createForm(finalForm);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast({ title: error.message });
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function updateForm(finalForm: {}) {
    // POST form data to blog api endpoint
    const res = await fetch(`/api/blog/${ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalForm),
    });
    if (!res.ok) {
      const { error } = await res.json();
      toast({ title: `server responded with ${res.status} error` });
      console.log(error);
      return;
    }
    toast({
      title: "Blog Updated",
      description: "you blog has been updated succesfully!",
    });
    router.push("/");
  }
  async function createForm(finalForm: {}) {
    // POST form data to blog api endpoint
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalForm),
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
};

export default index;
