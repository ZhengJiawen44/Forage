export async function getSignedURL(Blob: File) {
  //send the Blob's metadata to the server (not sending the Blob buffer)
  const form = {
    imageSize: String(Blob.size),
    imageType: Blob.type,
  };
  const res = await fetch("/api/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) {
    const { error } = await res.json();
    console.log(error);
    return null;
  }
  //recieve a signed URL for uploading the Blob
  const { url, uuID } = await res.json();
  //send the URL to frontend so it can send the Bob itself (server does not upload images, it just provides a signed URL)
  return { url, uuID };
}
