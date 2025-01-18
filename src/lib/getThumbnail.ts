import React from "react";

const getThumbnail = (html: string | undefined): string | undefined => {
  if (!html) return undefined;
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");

  const images = dom.getElementsByTagName("img");
  if (images.length === 0) {
    return undefined;
  }

  return images[0].src;
};

export default getThumbnail;
