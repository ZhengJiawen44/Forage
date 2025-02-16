"use client";
import React, {
  Suspense,
  useReducer,
  useState,
  useMemo,
  useEffect,
} from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineAvTimer } from "react-icons/md";
import clsx from "clsx";
import { AnalyticRecord } from "@/types";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import MonthPicker from "./MonthPicker";
import { useQuery } from "@tanstack/react-query";

const Graph = dynamic(() => import("./Graph"), { ssr: false });

interface Analytics {
  analytics: AnalyticRecord[];
}

const GraphContainer = ({ analytics }: Analytics) => {
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
  const [selectedMonth, setSelectedMonth] = useState("");

  // Filter analytics based on selected month
  const filteredAnalytics = useMemo(() => {
    if (!selectedMonth || !analytics.length) return analytics;

    const selectedDate = new Date(parseInt(selectedMonth));
    const selectedYear = selectedDate.getFullYear();
    const selectedMonthNum = selectedDate.getMonth();

    return analytics.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() === selectedMonthNum
      );
    });
  }, [analytics, selectedMonth]);

  const processedData = useMemo(() => {
    // Helper function to get all dates in a month
    const getDatesInMonth = (year: number, month: number) => {
      const dates = [];
      const lastDay = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        dates.push(
          date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        );
      }
      return dates;
    };

    // Get the target date from selected month or current date if no selection
    const targetDate = selectedMonth
      ? new Date(parseInt(selectedMonth))
      : new Date();

    const month = targetDate.getMonth();
    const year = targetDate.getFullYear();

    // Get all dates for the month
    const allDates = getDatesInMonth(year, month);

    // Initialize arrays with zero values for all dates
    const viewsArray = allDates.map((date) => ({ date, v: 0 }));
    const readsArray = allDates.map((date) => ({ date, v: 0 }));
    const hoursArray = allDates.map((date) => ({ date, v: 0 }));

    // If no analytics data, return the initialized arrays
    if (!filteredAnalytics.length) {
      return {
        views: viewsArray,
        reads: readsArray,
        averageReadDuration: hoursArray,
      };
    }

    // Process the actual data
    filteredAnalytics.forEach((item) => {
      const itemDate = new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const dateIndex = allDates.indexOf(itemDate);

      if (dateIndex !== -1) {
        viewsArray[dateIndex].v += item.views;
        readsArray[dateIndex].v += item.reads;
        hoursArray[dateIndex].v += item.totalHoursRead;
      }
    });

    return {
      views: viewsArray,
      reads: readsArray,
      averageReadDuration: hoursArray,
    };
  }, [filteredAnalytics, selectedMonth]);

  // Calculate totals for panel buttons
  const totals = useMemo(
    () => ({
      views: processedData.views.reduce((sum, item) => sum + item.v, 0),
      reads: processedData.reads.reduce((sum, item) => sum + item.v, 0),
      hours: processedData.averageReadDuration.reduce(
        (sum, item) => sum + item.v,
        0
      ),
    }),
    [processedData]
  );

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "pageViews":
        return processedData.views;
      case "readCount":
        return processedData.reads;
      case "averageReadTime":
        return processedData.averageReadDuration;
      default:
        return processedData.views;
    }
  };

  return (
    <>
      <div className="w-full h-fit flex justify-end my-4">
        <Suspense fallback={<>loading</>}>
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        </Suspense>
      </div>

      <div className="w-full border h-[30rem] rounded-2xl flex flex-col">
        <div className="w-full flex flex-wrap">
          <PanelButton
            className={clsx(
              "rounded-tl-2xl",
              activeTab === "pageViews" ? "text-foreground" : ""
            )}
            label="Views"
            icon={<MdOutlineRemoveRedEye className="w-5 h-5" />}
            onClick={() => dispatchTab({ type: "pageViews" })}
          >
            {totals.views}
          </PanelButton>
          <PanelButton
            className={activeTab === "readCount" ? "text-foreground" : ""}
            label="Reads"
            icon={<MdCheckCircleOutline className="w-5 h-5" />}
            onClick={() => dispatchTab({ type: "readCount" })}
          >
            {totals.reads}
          </PanelButton>
          <PanelButton
            className={clsx(
              "rounded-tr-2xl",
              activeTab === "averageReadTime" ? "text-foreground" : ""
            )}
            label="Average read duration"
            icon={<MdOutlineAvTimer className="w-5 h-5" />}
            onClick={() => dispatchTab({ type: "averageReadTime" })}
          >
            {totals.hours}
          </PanelButton>
        </div>
        <Graph GraphData={getCurrentData()} />
      </div>
    </>
  );
};

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
        "flex flex-1 flex-col justify-center items-center p-5 border text-item-foreground hover:cursor-pointer hover:text-foreground",
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
