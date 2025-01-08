import { uploadToS3 } from "./S3upload";
import { getSignedURL } from "./getSignedURL";
export async function uploadImage(richText: string, files: File[]) {
  // create a dom using the richtext
  const dom = new DOMParser();
  const parsed = dom.parseFromString(richText, "text/html");
  //collect all img in the richtext
  const DOMImages = parsed.getElementsByTagName("img");

  // console.log(files);
  // console.log(richText);

  //for each img in the richtext, get their actual file blob
  for (let DOMImage of DOMImages) {
    for (let j = 0; j < files.length; j++) {
      const Blob = files[j];
      if (DOMImage.alt === Blob.name) {
        try {
          //get the signed URL for the image
          const url = await getSignedURL(Blob);
          if (!url) {
            return {
              success: false,
              message: "server could not process your image",
            };
          }
          console.log("uploading: ", url.url);

          //store the image using the signed URL
          const res = await uploadToS3(url.url, Blob);
          if (!res) {
            return { success: false, message: "image failed to upload" };
          }

          const link = DOMImage.src;
          //if image is succefully uploaded to s3, we swap out the img src with the s3 image Link
          DOMImage.setAttribute(
            "src",
            `https://aws-blogs-images.s3.ap-southeast-1.amazonaws.com/${url.uuID}`
          );
          //we then revoke the temporary url assigned to that image
          URL.revokeObjectURL(link);
        } catch (error) {
          return { success: false, message: String(error) };
        }
      }
    }
  }

  return {
    success: true,
    message: "succesfully uploaded Image",
    html: parsed.body.innerHTML,
  };
}
