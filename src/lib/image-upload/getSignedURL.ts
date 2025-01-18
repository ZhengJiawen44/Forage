export async function getSignedURL(file: File) {
  //send the file's metadata to the server (not sending the file buffer)
  const form = {
    imageSize: String(file.size),
    imageType: file.type,
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
  //recieve a signed URL for uploading the file
  const { url, uuID } = await res.json();
  //send the URL to frontend so it can send the Bob itself (server does not upload images, it just provides a signed URL)
  return { url, uuID };
}
