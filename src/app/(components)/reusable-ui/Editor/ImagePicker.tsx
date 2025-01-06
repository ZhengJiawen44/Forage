"use client";
import React from "react";
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
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            className="w-full text-[1rem] mb-4"
            disabled={image?.name === null ? true : false}
            onClick={handleImageSubmit}
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

  async function handleImageSubmit() {
    if (!image) {
      console.log("no image file present");
      return;
    }
    const checksum = await computeSHA256(image);

    try {
      const form = {
        imageSize: String(image.size),
        imageType: image.type,
        checksum: checksum,
      };
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const { error } = await res.json();
        console.log(error);
        return;
      }
      const { url } = await res.json();
      putAWS(url);
      // editor
      //   .chain()
      //   .focus()
      //   .setImage({
      //     src: "",
      //   })
      //   .run();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function putAWS(url: string) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": image!.type },
        body: image,
      });
      if (res.ok) {
        console.log("image uploaded!");
      } else {
        console.log("failed to upload image!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function computeSHA256(file: File) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
};

export default ImagePicker;
