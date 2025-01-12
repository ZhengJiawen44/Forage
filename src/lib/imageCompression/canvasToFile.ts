import { randomUUID } from "crypto";

export function canvasToFile(canvas: HTMLCanvasElement): Promise<File> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const cImage = new File([blob!], "compressed", { type: "image/jpg" });
        resolve(cImage);
      },
      "image/jpeg",
      0.7
    );
  });
}
