import { beforeEach, describe, it } from "node:test";
import { expect, test } from "@jest/globals";
import fs from "node:fs";

let image;
describe("image compression", () => {
  beforeEach(async () => {
    image = await getFile();
  });

  test("compression returns a File type object", async () => {
    image = await getFile();

    // const blob = new Blob([image.buffer]);
    // console.log(image);

    expect(image).toEqual(undefined);
  });
});

async function getFile(): Promise<Buffer<ArrayBufferLike>> {
  return new Promise((resolve, reject) => {
    fs.readFile("test/images/SantaClausVillage-UHD.jpg", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
