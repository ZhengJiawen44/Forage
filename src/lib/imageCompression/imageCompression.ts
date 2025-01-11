import { canvasToFile } from "./canvasToFile";
export function CompressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
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
        const cImage = await canvasToFile(ctx!.canvas!);
        URL.revokeObjectURL(url);
        resolve(cImage);
      };
    } catch (error) {
      reject(error);
      if (error instanceof Error) throw new Error(error.message);
      console.log(error);
    }
  });
}
