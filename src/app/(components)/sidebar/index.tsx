"use client";
import React, { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import Link from "next/link";
import { useSidebar } from "@/app/hooks/useSidebar";
import { RxCaretDown } from "react-icons/rx";
import { RxCaretUp } from "react-icons/rx";
import LastReadLoading from "./LastReadLoading";
import RecommendationsLoading from "./RecommendationsLoading";
import { CiImageOff } from "react-icons/ci";
import { usePathname } from "next/navigation";
import IllustratedMessage from "../reusable-ui/IllustratedMessage";
interface lastRead {
  title: string;
  ID: number;
  thumbnail: string | undefined | null;
  description: string | undefined | null;
}

const Recommendation = () => {
  const pathname = usePathname();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [lastRead, setLastRead] = useState<lastRead>();

  const [loadingLastRead, setLoadingLastRead] = useState(true);
  const [loadingRecommendation, setLoadingRec] = useState(true);

  const [isExpandRecommend, setExpandRec] = useState(false);
  const Icon = isExpandRecommend ? RxCaretUp : RxCaretDown;

  const visibility = useSidebar();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blog");
      const body = await res.json();
      if (body.formattedBlogs) {
        setRecommendations(body.formattedBlogs);
      } else {
        setRecommendations([]);
      }
      setLoadingRec(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadLastRead = () => {
      const title = localStorage.getItem("last-read-title");
      const ID = Number(localStorage.getItem("last-read-ID"));
      const thumbnail = localStorage.getItem("last-read-thumbnail");
      const description = localStorage.getItem("last-read-description");
      if (ID && title) {
        setLastRead({ title, ID, thumbnail, description });
      } else {
        setLastRead(undefined);
      }
      setLoadingLastRead(false);
    };
    loadLastRead();
  }, [pathname]);

  return (
    <div
      className={
        visibility ? "lg:w-[30%] xl:w-[30%] h-fit sticky top-4" : "hidden"
      }
    >
      <div className={"h-fit bg-item border rounded-md pt-8  pb-2 px-3"}>
        <h1 className="mb-8 text-xl font-sans">Recommended</h1>
        {loadingRecommendation ? (
          <RecommendationsLoading />
        ) : recommendations.length > 0 ? (
          recommendations
            .slice(0, isExpandRecommend ? recommendations.length : 2)
            .map(({ id, title, createdAt, thumbnail }) => (
              <RecommendationCard
                key={id}
                id={id}
                title={title}
                date={createdAt}
                thumbnail={thumbnail}
              />
            ))
        ) : (
          <div className="text-center p-4 text-item-foreground">
            no recommendations
          </div>
        )}

        <Icon
          onClick={() => {
            setExpandRec(!isExpandRecommend);
          }}
          className={
            "m-auto w-8 h-8 mt-0 hover:bg-[hsl(0,0%,19%)] transition-all duration-200 rounded-full hover:cursor-pointer"
          }
        />
      </div>
      {/* last read section */}
      <div className="h-fit bg-item border rounded-md mt-8 pt-8 pb-12 px-3">
        <h1 className="mb-8 text-xl font-sans">Continue reading</h1>
        {loadingLastRead ? (
          <LastReadLoading />
        ) : !loadingLastRead && lastRead ? (
          <Link
            href={`/blog/${lastRead.ID}`}
            className="flex flex-col h-fit border p-8 gap-2 rounded-md 
          hover:bg-[hsl(0,0%,19%)] transition-all duration-[200ms]"
          >
            {lastRead.thumbnail ? (
              <img
                className=" rounded-md aspect-video"
                src={lastRead.thumbnail}
              />
            ) : (
              <div className="rounded-md aspect-video flex items-center border justify-center">
                <CiImageOff className="w-24 h-24" />
              </div>
            )}

            <div>
              <p
                className="overflow-hidden text-ellipsis line-clamp-1 font-bold 
          font-grotesk w-[95%] mb-2 tracking-tighter text-xl mt-4"
              >
                {lastRead.title}
              </p>

              <p className="overflow-hidden text-ellipsis line-clamp-2">
                {lastRead.description}
              </p>
            </div>
          </Link>
        ) : (
          <>
            <IllustratedMessage
              src="/SnowmanBrainfood.svg"
              className="mt-0 w-[13rem] h-[13rem] m-auto"
            />
            <p className="lg:text-xl m-auto w-fit mt-4">
              Read your first article today!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
