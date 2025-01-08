import React from "react";

const ContentLoadingSkeleton = () => {
  return (
    <>
      <div className="h-[1rem] w-full rounded-sm bg-item-foreground animate-pulse mb-2"></div>
      <div className="h-[1rem] w-[70%] rounded-sm bg-item-foreground animate-pulse"></div>
    </>
  );
};

export default ContentLoadingSkeleton;
