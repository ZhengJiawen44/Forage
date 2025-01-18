import React from "react";
import { CompressImage } from "../imageCompression/compressImage";
/**
 * function to upload a thumbnail image to aws s3
 * @param {string} url - the local url reference to the image
 * @returns {Promise<string|undefined>} the aws url to the image, or <undefined> if error
 */
async function uploadThumbnail(
  url: string
): Promise<{ URL: string; UUID: string } | undefined> {
  try {
    //convert URL to file object
    const image = await fetch(url);
    const blob = await image.blob();
    const file = new File([blob], "thumbnail", { type: blob.type });

    //compress the file
    const cFile = await CompressImage(file);

    //get the signed url from server api
    const form = {
      imageSize: String(cFile.size),
      imageType: cFile.type,
    };
    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const body = await res.json();
    if (!res.ok) {
      throw body.error;
    }
    const URL = body.url;
    const UUID = body.uuID;
    return { URL, UUID };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
export default uploadThumbnail;
