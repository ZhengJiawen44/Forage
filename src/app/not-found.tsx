import React from "react";
import Image from "next/image";
import { IllustratedMessage } from "./(components)";
import Link from "next/link";
const notFound = () => {
  return (
    <IllustratedMessage src="/SnowmanLosingMyHead.svg">
      <h1 className="font-semibold text-3xl ">404 not-found</h1>
      <p className="text-center">{`we understand this can be frustrating sometimes. Let's get you back to safety`}</p>
      <Link
        href={"/"}
        className=" underline text-blue-500 hover:text-white transition-all duration-300 "
      >
        Home
      </Link>
    </IllustratedMessage>
  );
};

export default notFound;
