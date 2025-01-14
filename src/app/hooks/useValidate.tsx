import React from "react";
import { useState, useRef, useEffect } from "react";

export const useValidate = (errors: any[] | undefined) => {
  // error states to guide user
  const [titleError, setTitleError] = useState<string | null>(null);
  const [lengthError, setLengthError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  //ref to auto focus on error
  const titleRef = useRef<HTMLInputElement>(null);
  const lengthRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  //if errors state changes, trigger a focus on the input and display the message
  useEffect(() => {
    let focus = false;
    if (errors) {
      errors.forEach(({ message, path }) => {
        switch (path[0]) {
          case "title":
            setTitleError(message);
            if (focus === false) {
              titleRef.current?.focus();
              focus = true;
            }

            break;
          case "length":
            setLengthError(message);
            if (focus === false) {
              lengthRef.current?.focus();
              focus = true;
            }

            break;
          case "description":
            descRef.current?.focus();

            if (focus === false) {
              setDescError(message);
            }
            break;
          case "content":
            setContentError(message);
            break;
        }
      });
    }
  }, [errors]);

  //return necessary states and refs
  const title = { titleError, setTitleError };
  const length = { lengthError, setLengthError };
  const description = { descError, setDescError };
  const content = { contentError, setContentError };
  const ref = { titleRef, lengthRef, descRef };
  return { ref, title, length, description, content };
};
