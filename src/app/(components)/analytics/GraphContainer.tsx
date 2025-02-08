"use client";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";
import { MdOutlinePercent } from "react-icons/md";
const GraphContainer = () => {
  return (
    <div className="w-full border h-80 rounded-2xl">
      <div className="w-ful flex flex-wrap">
        <div className="flex flex-1 flex-col justify-center items-center p-5 border rounded-tl-2xl">
          <p className="text-[0.8rem] flex justify-center items-center gap-3">
            Views <MdOutlineRemoveRedEye className="w-5 h-5" />
          </p>
          <p className="text-[1.5rem]">342</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center p-5 border">
          <p className="text-[0.8rem] flex justify-center items-center gap-3 ">
            Reads <MdCheckCircleOutline className="w-5 h-5" />
          </p>
          <p className="text-[1.5rem]">298</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center p-5 border">
          <p className="text-[0.8rem] flex justify-center items-center gap-3">
            click through rate <MdOutlinePercent className="w-5 h-5" />
          </p>
          <p className="text-[1.5rem]">98%</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center p-5 border rounded-tr-2xl">
          <p className="text-[0.8rem] flex justify-center items-center gap-3">
            Average read duration <MdOutlineAvTimer className="w-5 h-5" />
          </p>
          <p className="text-[1.5rem]">0.2</p>
        </div>
      </div>
    </div>
  );
};

export default GraphContainer;
