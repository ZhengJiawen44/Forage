import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface IllustratedMessageProps {
  children?: React.ReactNode;
  className?: string;
  src: string;
}
const IllustratedMessage = ({
  children,
  src,
  className,
  ...props
}: IllustratedMessageProps) => {
  return (
    <div
      className={cn("flex mt-[10rem] justify-center w-full", className)}
      {...props}
    >
      <div className="flex-col flex items-center">
        <Image
          src={src}
          alt="a snow man poking a x-mas tree"
          width={300}
          height={300}
          style={{ filter: "invert(0.6)" }}
        />
        <div className="lg:text-xl flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default IllustratedMessage;
