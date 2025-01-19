import { uploadToS3 } from "./S3upload";
import { getSignedURL } from "./getSignedURL";
import { CompressImage } from "../imageCompression/compressImage";
export async function uploadImage(richText: string) {
  // create a dom using the richtext
  const dom = new DOMParser();
  const parsed = dom.parseFromString(richText, "text/html");
  //collect all img in the richtext
  const DOMImages = parsed.getElementsByTagName("img");

  // console.log(files);
  // console.log(richText);

  DOMImages.length < 1 && {
    success: true,
    message: "no image",
  };
  //for each img in the richtext, get their actual file blob
  try {
    for (let image of DOMImages) {
      //get the signed URL for the image
      if (image.src.startsWith("blob:", 0)) {
        const res = await fetch(image.src);
        const blob = await res.blob();
        let file = await new File([blob], image.alt, { type: blob.type });
        file = await CompressImage(file);
        const url = await getSignedURL(file);
        if (!url) {
          return {
            success: false,
            message: "server could not process your image",
          };
        }
        console.log("uploading: ", url.url);

        //store the image using the signed URL
        const uploadRes = await uploadToS3(url.url, file);
        if (!uploadRes) {
          return { success: false, message: "image failed to upload" };
        }
        //if image is succefully uploaded to s3, we swap out the img src with the s3 image Link
        image.setAttribute(
          "src",
          `https://aws-blogs-images.s3.ap-southeast-1.amazonaws.com/${url.uuID}`
        );
        //we then revoke the temporary url assigned to that image
        URL.revokeObjectURL(image.src);
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return { success: false, message: error.message };
  }

  return {
    success: true,
    message: "succesfully uploaded Image",
    html: parsed.body.innerHTML,
  };
}
