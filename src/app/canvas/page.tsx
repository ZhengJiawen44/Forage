"use client";
import React, { useRef } from "react";

const page = () => {
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  console.log(canvas);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
};

export default page;
