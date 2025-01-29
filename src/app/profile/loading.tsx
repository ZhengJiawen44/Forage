import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loading = () => {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform 
      -translate-x-1/2 -translate-y-1/2"
    >
      <AiOutlineLoading3Quarters className="animate-spin w-14 h-14" />
    </div>
  );
};

export default loading;
