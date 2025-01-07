export async function uploadToS3(url: string, Blob: File) {
  //use the Signed URL to store an image on s3 bucket.
  //checksum is required for future improvement
  const AWSres = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": Blob!.type },
    body: Blob,
  });
  if (AWSres.ok) {
    return { message: "uploaded succesfully!" };
  } else {
    return null;
  }
}
