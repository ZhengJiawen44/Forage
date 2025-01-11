export async function CompressImage(file: File): Promise<File> {
  try {
    //create a img element with the file
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;

    //once image loads, use canvas to compress image
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas?.getContext("2d");

      //draw image on canvas
      canvas!.height = image.height;
      canvas!.width = image.width;
      ctx?.drawImage(image, 0, 0, image.width, image.height);

      //export canvas as compressed image
      // const compressedImg = ctx?.canvas.toDataURL("image/jpeg", 0.7);
      ctx?.canvas.toBlob((blob) => {}, "image/jpeg", 0.7);
      // const res = await fetch(compressedImg!);
      // const blob = await res.blob();
      // const file = new File([blob], "compressed", { type: "image/jpeg" });
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    console.log(error);
  }
}
