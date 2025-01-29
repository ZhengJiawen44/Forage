import React from "react";
import Image from "next/image";
import Link from "next/link";
const notFound = () => {
  return (
    <div className="w-full  flex flex-col items-center justify-center gap-3 pt-4">
      <Image
        src="/SnowmanLosingMyHead.svg"
        alt="Snowman Losing My Head"
        width={0}
        height={0}
        style={{ width: "50%", height: "auto", filter: "invert(0.5)" }}
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-semibold text-3xl ">404 not-found</h1>
        <p className="text-center">{`we understand this can be frustrating sometimes. Let's get you back to safety`}</p>
        <Link
          href={"/"}
          className=" underline text-blue-500 hover:text-white transition-all duration-300 "
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default notFound;
