import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useUser } from "@/app/providers/UserProvider";
import { useToast } from "@/hooks/use-toast";
const About = () => {
  const { user, refreshUser } = useUser();
  const [isEdit, setEdit] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formValues = Object.fromEntries(new FormData(event.currentTarget));
      const res = await fetch(`/api/user/${user!.id}`, {
        method: "PATCH",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await res.json();
      if (!res.ok) {
        toast({ title: `${res.status} error`, content: body.error });
        console.log(res);
        return;
      }
      toast({ title: `update success`, content: body.message });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast({ title: error.name, content: error.message });
      }
    } finally {
      setEdit(false);
      refreshUser();
    }
  };
  useEffect(() => {
    if (isEdit) {
      textAreaRef.current?.focus();
      const length = textAreaRef.current?.value.length || 0;
      textAreaRef.current?.setSelectionRange(length, length, "forward");
    }
  }, [isEdit]);
  return (
    <>
      {isEdit ? (
        <form className="flex flex-col w-full gap-4" onSubmit={submitHandler}>
          <textarea
            ref={textAreaRef}
            name="about"
            defaultValue={user?.about || "preview Lorem Ipsum"}
            className="text-lg bg-item lg:bg-background h-fit scrollbar-none resize-none focus:outline-none"
          ></textarea>
          <div className="flex gap-4 ml-auto mr-0">
            <button
              className="text-lg hover:bg-white hover:text-black w-fit py-1 p-4  border rounded-full transition-all duration-300"
              onClick={() => setEdit(false)}
            >
              cancel
            </button>
            <button className="text-lg w-fit py-1 p-4  border bg-green-800 hover:bg-green-700 rounded-full">
              save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col">
          <pre className="text-lg min-h-fit mb-10 font-montserrat">
            {user?.about || "preview Lorem Ipsum"}
          </pre>
          <button
            className="text-lg hover:bg-white hover:text-black w-fit py-1 p-4 ml-auto mr-0 border rounded-full transition-all duration-300"
            onClick={() => {
              setEdit(true);
            }}
          >
            edit
          </button>
        </div>
      )}
    </>
  );
};

export default About;
