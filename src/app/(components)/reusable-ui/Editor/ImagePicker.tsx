"use client";
import React from "react";
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
  const [file, setFile] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger>
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
            {file ? (
              <div>
                <IoMdImages className="w-full h-full text-item-foreground" />
                <p>{file}</p>
              </div>
            ) : (
              <IoMdImages className="w-full h-full text-item-foreground" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            id="image"
            onChange={(event) => {
              const filepath = event.currentTarget.value.split("\\");
              setFile(filepath[filepath.length - 1]);
            }}
          />
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            className="w-full text-[1rem] mb-4"
            disabled={file === null ? true : false}
          >
            Upload
          </Button>
          <DialogClose asChild>
            <Button variant={"destructive"} className="w-full text-[1rem] mb-4">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
