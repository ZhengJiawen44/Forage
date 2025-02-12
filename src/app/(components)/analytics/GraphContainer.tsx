"use client";
import React, { Suspense, useReducer, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";
import clsx from "clsx";
import { AnalyticRecord } from "@/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import MonthPicker from "./MonthPicker";
const Graph = dynamic(() => import("./Graph"), { ssr: false });
interface Analytics {
  analytics: AnalyticRecord[];
}
const GraphContainer = ({ analytics }: Analytics) => {
  console.log(analytics);

  function panelReducer(
    state: string,
    action: { type: "pageViews" | "readCount" | "averageReadTime" }
  ) {
    if (action.type === "pageViews") {
      return "pageViews";
    } else if (action.type === "readCount") {
      return "readCount";
    } else {
      return "averageReadTime";
    }
  }

  const [activeTab, dispatchTab] = useReducer(panelReducer, "pageViews");

  return (
    <>
      <Suspense fallback={<>loading</>}>
        <MonthPicker />
      </Suspense>

      <div className="w-full border h-[30rem] rounded-2xl flex flex-col">
        <div className="w-full flex flex-wrap ">
          <PanelButton
            className={clsx(
              "rounded-tl-2xl",
              activeTab === "pageViews" ? "text-foreground" : ""
            )}
            label="Views"
            icon={<MdOutlineRemoveRedEye className="w-5 h-5" />}
            onClick={() => {
              dispatchTab({ type: "pageViews" });
            }}
          >
            345
          </PanelButton>
          <PanelButton
            className={activeTab === "readCount" ? "text-foreground" : ""}
            label="Reads"
            icon={<MdCheckCircleOutline className="w-5 h-5" />}
            onClick={() => {
              dispatchTab({ type: "readCount" });
            }}
          >
            891
          </PanelButton>
          <PanelButton
            className={clsx(
              "rounded-tr-2xl",
              activeTab === "averageReadTime" ? "text-foreground" : ""
            )}
            label="Average read duration"
            icon={<MdOutlineAvTimer className="w-5 h-5" />}
            onClick={() => {
              dispatchTab({ type: "averageReadTime" });
            }}
          >
            299
          </PanelButton>
        </div>
        <Graph />
      </div>
    </>
  );
};

//Panel Button component
function PanelButton({
  children,
  className,
  label,
  icon,
  onClick,
  ...props
}: {
  children?: React.ReactNode;
  props?: [string];
  className?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-1 flex-col justify-center items-center p-5 border  text-item-foreground hover:cursor-pointer hover:text-foreground",
        className
      )}
      onClick={onClick}
    >
      <p className="text-[0.8rem] flex justify-center items-center gap-3">
        {label} {icon}
      </p>
      <p className="text-[1.5rem]">{children}</p>
    </div>
  );
}

export default GraphContainer;
