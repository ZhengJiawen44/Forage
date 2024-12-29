import Link from "next/link";
import React from "react";

interface CardProps {
  id: String;
  title: String;
  date: String;
}
const RecommendationCard = ({ id, title, date }: CardProps) => {
  return (
    <>
      <Link
        href={`/Blog/${id}`}
        className="text-foreground relative block h-fit mb-8"
      >
        <h1 className=" font-bold font-grotesk w-[95%] mb-2 tracking-tighter text-xl">
          {title}
        </h1>
        <div className=" flex w-[95%] ">
          <p className="text-item-foreground">{date}</p>
        </div>
      </Link>
    </>
  );
};

export default RecommendationCard;
