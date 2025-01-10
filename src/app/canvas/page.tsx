"use client";
import React, { useRef, useState } from "react";

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileCompressed, setFileCompressed] = useState<string | null>(null);

  async function handleUpload(event) {
    if (!event.target.files) {
      console.log("no files");

      return;
    }
    setFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      canvas!.height = image.height;
      canvas!.width = image.width;
      ctx?.drawImage(image, 0, 0, image.width, image.height);
      const compressedImg = ctx?.canvas.toDataURL("image/jpeg", 0.7);
      ctx?.canvas.toDataURL();
      setFileCompressed(compressedImg!);
    };
  }

  return (
    <>
      <form>
        <input type="file" onChange={(event) => handleUpload(event)} />
        <br />
        {file && <p>size:{" " + (file!.size / 1000000).toFixed(2) + " "}mb</p>}
      </form>
      {file && <img src={URL.createObjectURL(file!)}></img>}
      {fileCompressed && <img src={fileCompressed}></img>}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </>
  );
};

export default page;
