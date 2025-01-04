"use client";
import React, { useState } from "react";
import { TbExclamationCircle } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";
import { TbX } from "react-icons/tb";
import clsx from "clsx";

interface formProps {
  isError?: boolean;
  message?: string;
}

const FormError = ({ message, isError = true }: formProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (message !== "") {
    return (
      <div
        className={clsx(
          "flex items-center gap-2 w-full  p-3 rounded-sm mt-2 md:mt-0 transition-all ease-in-out duration-1000 ",
          !isVisible && "hidden",
          isError ? "bg-[#ffd4d4] text-red-500" : "bg-[#b5ff8d] text-[#0b2905]"
        )}
      >
        {isError ? <TbExclamationCircle /> : <TbCircleCheck />}

        {message}
        <button
          type="button"
          className="mr-0 ml-auto"
          onClick={() => setIsVisible(false)}
        >
          <TbX />
        </button>
      </div>
    );
  }
  return;
};

export default FormError;
