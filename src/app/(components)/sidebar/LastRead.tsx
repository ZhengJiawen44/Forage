"use client";
import React from "react";

interface lastReadProps {
  id: string;
  title: string;
}
const LastRead = ({ id, title }: lastReadProps) => {
  localStorage.setItem("last-read-ID", id);
  localStorage.setItem("last-read-title", title);
};

export default LastRead;
