import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

interface CardTitleProps extends CardProps {
  href: string;
}

const CardContainer = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-5 lg:mb-10 border bg-item p-6 gap-4 lg:gap-14 rounded-[5px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardPane = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("h-full", className)} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ href, className, children, ...props }: CardTitleProps) => {
  return (
    <h1
      className={cn(
        "font-sans text-lg lg:text-2xl mb-2 md:mb-4 font-normal hover:underline",
        className
      )}
      {...props}
    >
      <Link href={href}>{children}</Link>
    </h1>
  );
};

const CardBody = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "text-[0.9rem] text-item-foreground mb-8 md:mb-10 overflow-hidden text-ellipsis line-clamp-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "flex text-item-foreground text-[0.8rem] md:text-[1rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { CardContainer, CardBody, CardFooter, CardHeader, CardPane, CardTitle };
