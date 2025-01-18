import Link from "next/link";
import React from "react";

interface CardProps {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  date: string;
}
const RecommendationCard = ({
  id,
  title,
  date,
  thumbnail,
  description,
}: CardProps) => {
  return (
    <>
      <Link
        href={`/Blog/${id}`}
        className="text-foreground h-fit mb-3 flex gap-4 border rounded-md p-4 hover:bg-[hsl(0,0%,19%)] "
      >
        <img src={thumbnail} className="h-12 aspect-video" />
        <div className="w-full">
          <h1 className="font-grotesk w-[95%] tracking-tighter text-lg">
            {title}
          </h1>
          <div className=" flex w-[95%] ">
            <p className="text-item-foreground text-sm">{date}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default RecommendationCard;
