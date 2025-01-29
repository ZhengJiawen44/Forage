import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen translate-y-[-10rem]">
      <AiOutlineLoading3Quarters className="animate-spin w-14 h-14" />
    </div>
  );
};

export default loading;
