import { beforeEach, describe } from "node:test";
import { expect, test } from "@jest/globals";
import fs from "node:fs";

let image;
describe("image compression", () => {
  beforeEach(async () => {
    image = await getFile();
  });

  test("compression returns a File type object", async () => {
    image = await getFile();
    expect(image instanceof File).toBe(true);
  });
});

async function getFile(): Promise<File> {
  return new Promise((resolve, reject) => {
    fs.readFile("__tests__/images/SantaClausVillage-UHD.jpg", (error, data) => {
      if (error) {
        reject(error);
      }
      const file = new File([data], "image", { type: "image/jpeg" });
      resolve(file);
    });
  });
}
