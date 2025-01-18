"use client";
import React, { useState } from "react";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
import { useSidebar } from "@/app/hooks/useSidebar";

// import LoadingForm from "@/components/Loading/LoadingForm";
const Recommendation = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [lastRead, setLastRead] = useState<Record<string, string>>({});
  const [display, setDisplay] = useState(true);
  //get last read article from local storage
  const title = localStorage.getItem("last-read-title") ?? "";
  const ID = localStorage.getItem("last-read-ID") ?? "";

  const visibility = useSidebar();

  return (
    <div
      className={
        visibility
          ? "lg:w-[20%] xl:w-[30%] pt-16 pl-[2.5rem] bg-item"
          : "hidden"
      }
    >
      <h1 className="mb-8 text-xl font-sans">Recommended</h1>

      {recommendations?.length > 0
        ? recommendations.map(({ id, title, date }) => (
            <RecommendationCard key={id} id={id} title={title} date={date} />
          ))
        : ""}
      <h1 className="mt-20 mb-8 text-xl font-sans">Continue reading</h1>
      <Link href={`/blog/${ID}`}>
        <p className=" font-bold font-grotesk w-[95%] mb-2 tracking-tighter text-xl">
          {title}
        </p>
      </Link>
    </div>
  );
};

export default Recommendation;
