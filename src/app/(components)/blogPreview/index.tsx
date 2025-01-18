"use client";
import React, { FormEvent, useState } from "react";
import uploadThumbnail from "@/lib/image-upload/uploadThumbnail";
import { CompressImage } from "@/lib/imageCompression/compressImage";
import { uploadToS3 } from "@/lib/image-upload/S3upload";
import { uploadImage } from "@/lib/image-upload/uploadImage";
import { BsXLg } from "react-icons/bs";
import { useToast } from "@/hooks/use-toast";
import { ImSpinner8 } from "react-icons/im";
interface Action {
  type: "changeURL";
  newURL: string | undefined;
}
interface blogPreviewProps {
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
}: blogPreviewProps) => {
  if (!display) {
    return;
  }
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(description?.length);

  return (
    <div className="absolute inset-0 top-0 left-0 z-10 bg-item lg:bg-background">
      <form onSubmit={handlePublish}>
        <div className="flex gap-11 lg:gap-14 h-fit my-8 border p-8 rounded-lg">
          <div className="w-[70%] md:w-[80%] xl:w-[77%] ">
            <textarea
              className="focus:outline-none resize-none w-full bg-item lg:bg-background h-[80%] 
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
            <p className="text-sm text-item-foreground">
              {wordCount ? wordCount : 0}/200
            </p>
          </div>

          <div className="w-[30%] md:w-[20%] xl:w-[23%] relative">
            <img
              className="rounded-lg object-cover aspect-video"
              src={thumbnail.url}
            />
            <BsXLg
              strokeWidth={1.5}
              className={
                thumbnail.url
                  ? "absolute top-1 right-1 hover:cursor-pointer hover:text-white hover:rotate-90 transition-all duration-[400ms]"
                  : "hidden"
              }
              onClick={() =>
                setThumbnail({ type: "changeURL", newURL: undefined })
              }
            />
            <div
              className="absolute bottom-[50%] right-[50%] translate-x-1/2 translate-y-1/2
           bg-black bg-opacity-80 w-fit py-1 px-4 rounded-3xl"
            >
              <label
                htmlFor="thumbnail"
                className="text-sm md:text-[0.9rem] text-item-foreground whitespace-nowrap hover:text-white hover:cursor-pointer
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
    try {
      //first upload the thumbnail to aws s3 (if any)
      let formThumbnail = null;
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
      console.log(finalForm);
      setSubmitting(true);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }

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
  }
};

export default index;
