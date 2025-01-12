"use client";
import React, { useState, useEffect } from "react";

import ContentLoadingSkeleton from "./ContentLoadingSkeleton";
interface SanitizedContentProps {
  content: string;
}

const SanitizedContent = ({ content }: SanitizedContentProps) => {
  const [sanitizedContent, setSanitizedContent] = useState<string | null>(null);

  useEffect(() => {
    const dom = new DOMParser();
    const body = dom.parseFromString(content, "text/html");
    const paragraph = Array.from(body.getElementsByTagName("p"))[0];
    setSanitizedContent(paragraph.innerHTML);
  }, []);

  return sanitizedContent ? (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedContent!,
      }}
    />
  ) : (
    <ContentLoadingSkeleton />
  );
};

export default SanitizedContent;
