import React, { useState, useRef, useEffect } from "react";

interface AboutProps {
  id?: string;
  name?: string;
  about?: string;
  email?: string;
  role?: string;
}
const About = ({ user }: { user: AboutProps }) => {
  const [isEdit, setEdit] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
        <form className="flex flex-col w-full gap-4">
          <textarea
            ref={textAreaRef}
            defaultValue={user.about}
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
          <p className="text-lg min-h-fit mb-10">{user.about}</p>
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
