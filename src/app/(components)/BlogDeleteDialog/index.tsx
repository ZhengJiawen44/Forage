"use client";
import React from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/(components)/reusable-ui/alert-dialog";
import { Button } from "@/app/(components)/reusable-ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
interface indexProps {
  id: number;
}
export function index({ id }: indexProps) {
  const { toast } = useToast();
  const router = useRouter();
  async function handleDelete() {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/");
        toast({ title: "blog successfully deleted" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="font-sans">
        <div className="flex gap-2 items-center cursor-pointer text-[1rem] text-red-500 py-1 pl-2 w-full hover:bg-[#27272a] rounded-[7px]">
          <IoTrashBinOutline className="w-5 h-5" />
          <p>Delete</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            from our server
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-sans text-[1rem]"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default index;
