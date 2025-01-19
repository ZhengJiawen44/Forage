import React from "react";

const RecommendationsLoading = () => {
  return (
    <>
      {" "}
      <div className="text-foreground h-fit mb-3 flex gap-4 border rounded-md p-4 hover:bg-[hsl(0,0%,19%)] ">
        <div
          className="h-12 aspect-video rounded-md bg-[hsl(0,0%,19%)] animate-pulse"
          id="thumbnail-skeleton"
        ></div>
        <div className="w-full">
          <div
            className="rounded-md bg-[hsl(0,0%,19%)] animate-pulse h-4 w-1/2 my-2"
            id="title-skeleton"
          ></div>
          <div className=" flex w-[95%]">
            <div
              className="rounded-md bg-[hsl(0,0%,19%)] animate-pulse h-2 w-[7rem]"
              id="date-skeleton"
            ></div>
          </div>
        </div>
      </div>{" "}
      <div className="text-foreground h-fit mb-3 flex gap-4 border rounded-md p-4 hover:bg-[hsl(0,0%,19%)] ">
        <div
          className="h-12 aspect-video rounded-md bg-[hsl(0,0%,19%)] animate-pulse"
          id="thumbnail-skeleton"
        ></div>
        <div className="w-full">
          <div
            className="rounded-md bg-[hsl(0,0%,19%)] animate-pulse h-4 w-1/2 my-2"
            id="title-skeleton"
          ></div>
          <div className=" flex w-[95%]">
            <div
              className="rounded-md bg-[hsl(0,0%,19%)] animate-pulse h-2 w-[7rem]"
              id="date-skeleton"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationsLoading;
