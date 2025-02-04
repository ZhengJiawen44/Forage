import React from "react";

const MenuLoading = () => {
  return (
    <>
      <div className="w-full bg-accent lg:bg-item rounded-xl animate-pulse h-7 mb-11"></div>
      <div className="flex flex-col gap-4">
        <div className="ml-3 w-[10rem] h-7 rounded-full bg-accent lg:bg-item animate-pulse" />
        <div className="ml-3 w-[10rem] h-7 rounded-full bg-accent lg:bg-item animate-pulse" />
      </div>
    </>
  );
};

export default MenuLoading;
