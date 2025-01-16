"use client";
import React, { FormEvent, useState } from "react";

interface blogPreviewProps {
  display: Boolean;
  setDisplay: React.Dispatch<React.SetStateAction<Boolean>>;
  editorForm: { [k: string]: FormDataEntryValue };
  description?: string;
  setDesc: React.Dispatch<React.SetStateAction<string | undefined>>;
  thumbnail?: string;
  setThumbnail: React.Dispatch<React.SetStateAction<string | undefined>>;
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
            <img className="rounded-lg" src={thumbnail} />
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
                    console.log(e.target.files[0].name);
                    setThumbnail(URL.createObjectURL(e.target.files![0]));
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            className="border-item border p-4 px-4 py-1  rounded-3xl font-sans"
            type="button"
            onClick={() => setDisplay((display) => !display)}
          >
            Back
          </button>
          <button
            className="bg-[#285000] px-4 py-1 rounded-3xl font-sans"
            type="submit"
          >
            publish
          </button>
        </div>
      </form>
    </div>
  );
  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // const { description, thumbnail } = Object.fromEntries(
    //   new FormData(event.currentTarget)
    // );

    // const requestBody = { description, thumbnail, ...editorForm };
    // console.log(requestBody);

    // console.log(Object.fromEntries(new FormData(currTarget)));

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
