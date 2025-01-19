"use client";
import React, { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
import { useSidebar } from "@/app/hooks/useSidebar";
import { RxCaretDown } from "react-icons/rx";
import LastReadLoading from "./LastReadLoading";
import RecommendationsLoading from "./RecommendationsLoading";
import { usePathname } from "next/navigation";
interface lastRead {
  title: string;
  ID: number;
  thumbnail: string;
  description: string;
}

const Recommendation = () => {
  const pathname = usePathname();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  //get last read article from local storage
  const [lastRead, setLastRead] = useState<lastRead>();
  const [loading, setLoading] = useState(true);
  const visibility = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blog");
      const { formattedBlogs } = await res.json();
      setRecommendations(formattedBlogs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadLastRead = () => {
      const title = localStorage.getItem("last-read-title");
      const ID = Number(localStorage.getItem("last-read-ID"));
      const thumbnail = localStorage.getItem("last-read-thumbnail");
      const description = localStorage.getItem("last-read-description");
      console.log(ID);
      if (ID && title && thumbnail && description) {
        console.log(ID);

        setLastRead({ title, ID, thumbnail, description });
      } else {
        setLastRead(undefined);
      }
      setLoading(false);
    };
    loadLastRead();
  }, [pathname]);

  return (
    <div className={visibility ? "lg:w-[20%] xl:w-[30%] h-fit" : "hidden"}>
      <div className="h-fit bg-item border rounded-md pt-8 pb-2 px-3 ">
        <h1 className="mb-8 text-xl font-sans">Recommended</h1>

        {recommendations?.length > 0 ? (
          recommendations.map(
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
        ) : (
          <RecommendationsLoading />
        )}

        <RxCaretDown
          className="m-auto w-8 h-8 mt-0 hover:bg-[hsl(0,0%,19%)]
         transition-all duration-200 rounded-full hover:cursor-pointer"
        />
      </div>
      {/* last read section */}
      <div className="h-fit bg-item border rounded-md mt-8 pt-8 pb-5 px-3">
        <h1 className="mb-8 text-xl font-sans">Continue reading</h1>
        {loading ? (
          <LastReadLoading />
        ) : !loading && lastRead ? (
          <Link
            href={`/blog/${lastRead.ID}`}
            className="flex flex-col h-fit border p-8 gap-2 rounded-md 
          hover:bg-[hsl(0,0%,19%)] transition-all duration-[200ms]"
          >
            <img
              className=" rounded-md aspect-video"
              src={lastRead.thumbnail}
            />
            <div>
              <p
                className="overflow-hidden text-ellipsis line-clamp-1 font-bold 
          font-grotesk w-[95%] mb-2 tracking-tighter text-xl "
              >
                {lastRead.title}
              </p>

              <p className="overflow-hidden text-ellipsis line-clamp-2">
                {lastRead.description}
              </p>
            </div>
          </Link>
        ) : (
          <div className="text-center p-4 text-item-foreground">
            No recently read articles
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
