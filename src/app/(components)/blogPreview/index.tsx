import React from "react";

const index = ({ display }) => {
  if (!display) {
    return null;
  }
  return (
    <div className="absolute w-full h-full border-white border-2 border-solid top-0 left-0 z-10 bg-background">
      index
    </div>
  );
};

export default index;
