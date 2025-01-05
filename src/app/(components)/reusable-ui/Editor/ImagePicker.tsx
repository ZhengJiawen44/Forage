"use client";
import React, { FormEvent } from "react";
import { useCurrentEditor } from "@tiptap/react";
import { IoImageOutline } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { Button } from "@/app/(components)/reusable-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/app/(components)/reusable-ui/dialog";
import { useState } from "react";
const ImagePicker = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <IoImageOutline
          title="upload image"
          className="p-3 h-[3rem] w-[3rem] text-item-foreground 
          hover:cursor-pointer transition-all duration-100 rounded-[8px]
          hover:text-white hover:bg-item"
        />
      </DialogTrigger>
      <DialogContent className="rounded-[10px]">
        <DialogHeader>
          <DialogTitle className="m-auto mb-4">Image Upload</DialogTitle>
          <DialogDescription className="m-auto">
            browse your files or drag and drop an image into here!
          </DialogDescription>
        </DialogHeader>
        <div>
          <label
            htmlFor="image"
            className="mt-4 p-10 hover:cursor-pointer bg-item w-full aspect-video rounded-lg 
            border flex justify-center items-center"
          >
            {image ? (
              <div>
                <IoMdImages className="w-full h-full text-item-foreground" />
                <p>{image?.name}</p>
              </div>
            ) : (
              <IoMdImages className="w-full h-full text-item-foreground" />
            )}
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            name="image"
            id="image"
            onChange={(event) => {
              if (!event.target.files) {
                console.log("no files");
                return;
              }
              const image = event.target.files[0];
              setImage(image);
              console.log(image.name);
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            className="w-full text-[1rem] mb-4"
            disabled={image?.name === null ? true : false}
            onClick={(event) => {
              if (!image) {
                console.log("no image file present");

                return;
              }
              const formData = new FormData();
              formData.append("image", image);
              handleImageSubmit(formData);
              // editor
              //   .chain()
              //   .focus()
              //   .setImage({
              //     src: "",
              //   })
              //   .run();

              setOpen(false);
            }}
          >
            Upload
          </Button>
          <DialogClose asChild onClick={() => setOpen(false)}>
            <Button variant={"destructive"} className="w-full text-[1rem] mb-4">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  async function handleImageSubmit(formData: FormData) {
    try {
      if (!image) return null;
      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });
      const { url } = await res.json();

      const awsRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": image.type },
        body: image,
      });
      const response = awsRes.headers;
      console.log(response);

      console.log(url);
    } catch (error) {
      console.log(error);
    }
  }
};

export default ImagePicker;
