"use client";
import React from "react";

interface lastReadProps {
  id: string;
  title: string;
  thumbnail: string | null;
  description: string | undefined | null;
}
const LastRead = ({ id, title, thumbnail, description }: lastReadProps) => {
  localStorage.setItem("last-read-ID", id);
  localStorage.setItem("last-read-title", title);
  localStorage.setItem("last-read-thumbnail", thumbnail ?? "");
  localStorage.setItem("last-read-description", description ?? "");
  return <></>;
};

export default LastRead;
