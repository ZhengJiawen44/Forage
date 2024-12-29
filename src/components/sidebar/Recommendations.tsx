"use client";
import React, { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
// import LoadingForm from "@/components/Loading/LoadingForm";
const Recommendation = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [lastRead, setLastRead] = useState<Record<string, string>>({});

  // useEffect(() => {
  //   async function getRecommendations() {
  //     try {
  //       //get recommendations from api
  //       const response = await fetch("/api/Blog", { method: "GET" });
  //       const { formattedBlogs } = await response.json();
  //       setRecommendations(formattedBlogs);

  //       //get last read article from local storage
  //       const title = localStorage.getItem("lastReadTitle") ?? "";
  //       const ID = localStorage.getItem("lastReadID") ?? "";
  //       setLastRead({ title, ID });
  //     } catch (error) {
  //       console.error("Failed to fetch recommendations");
  //     }
  //   }
  //   getRecommendations();
  // }, []);

  return (
    <div>
      <h1 className="mb-8 text-xl">Recommended</h1>

      {recommendations?.length > 0
        ? recommendations.map(({ id, title, date }) => (
            <RecommendationCard key={id} id={id} title={title} date={date} />
          ))
        : ""}
      <h1 className="mt-20 mb-8 text-xl">Continue reading</h1>
      <Link href={`/Blog/${lastRead.ID}`}>
        <p className=" font-bold font-grotesk w-[95%] mb-2 tracking-tighter text-xl">
          {lastRead.title}
        </p>
      </Link>
    </div>
  );
};

export default Recommendation;
