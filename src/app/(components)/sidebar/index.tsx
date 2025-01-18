"use client";
import React, { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
import { useSidebar } from "@/app/hooks/useSidebar";
import { RxCaretDown } from "react-icons/rx";
const Recommendation = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  //get last read article from local storage
  const [title, setTitle] = useState<string>();
  const [ID, setID] = useState<string>();
  const [thumbnail, setThumbnail] = useState<string>();
  const [description, setDescription] = useState<string>();

  const visibility = useSidebar();

  useEffect(() => {
    setTitle(localStorage.getItem("last-read-title") ?? "");
    setID(localStorage.getItem("last-read-ID") ?? "");
    setThumbnail(localStorage.getItem("last-read-thumbnail") ?? "");
    setDescription(localStorage.getItem("last-read-description") ?? "");
    const fetchData = async () => {
      const res = await fetch("/api/blog");
      const { formattedBlogs } = await res.json();
      setRecommendations(formattedBlogs);
      console.log(formattedBlogs);
    };
    fetchData();
  }, []);

  return (
    <div className={visibility ? "lg:w-[20%] xl:w-[30%] h-fit" : "hidden"}>
      <div className="h-fit bg-item border rounded-md pt-8 pb-2 px-3 ">
        <h1 className="mb-8 text-xl font-sans">Recommended</h1>
        {recommendations?.length > 0
          ? recommendations.map(
              ({ id, title, createdAt, description, thumbnail }) => (
                <RecommendationCard
                  key={id}
                  id={id}
                  title={title}
                  date={createdAt}
                  description={description}
                  thumbnail={thumbnail}
                />
              )
            )
          : ""}
        <RxCaretDown className="m-auto w-8 h-8 mt-0" />
      </div>
      <div className="h-fit bg-item border rounded-md mt-8 pt-8 pb-5 px-3">
        <h1 className="mb-8 text-xl font-sans">Continue reading</h1>
        <Link
          href={`/blog/${ID})}`}
          className="flex flex-col h-fit border p-8 gap-2 rounded-md 
          hover:bg-[hsl(0,0%,19%)] transition-all duration-[200ms]"
        >
          <img className=" rounded-md aspect-video" src={thumbnail} />
          <div>
            <p
              className="overflow-hidden text-ellipsis line-clamp-1 font-bold 
          font-grotesk w-[95%] mb-2 tracking-tighter text-xl "
            >
              {title}
            </p>

            <p className="overflow-hidden text-ellipsis line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recommendation;
