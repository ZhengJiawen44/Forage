"use client";
import React, { useState, useEffect } from "react";
import { DOMSanitizer } from "@/lib/DOMSanitizer";
import ContentLoadingSkeleton from "./ContentLoadingSkeleton";
interface SanitizedContentProps {
  content: string;
}

const SanitizedContent = ({ content }: SanitizedContentProps) => {
  const [sanitizedContent, setSanitizedContent] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setSanitizedContent(DOMSanitizer(content));
  }, [content]);

  return sanitizedContent ? (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  ) : (
    <ContentLoadingSkeleton />
  );
};

export default SanitizedContent;
