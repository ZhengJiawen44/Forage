import React from "react";

const LastReadLoading = () => {
  return (
    <div className="flex flex-col h-fit border p-8 gap-2 rounded-md">
      <div
        className="bg-[hsl(0,0%,19%)] animate-pulse rounded-md aspect-video"
        id="image-skeleton"
      />
      <div>
        <div
          className="w-1/2 h-4 my-2 rounded-md bg-[hsl(0,0%,19%)] animate-pulse"
          id="title-skeleton"
        ></div>

        <div
          className="h-4 rounded-md bg-[hsl(0,0%,19%)] animate-pulse"
          id="description-skeleton"
        ></div>
      </div>
    </div>
  );
};

export default LastReadLoading;
