import { beforeEach, describe, test } from "node:test";
import fs from "fs/promises";

describe("image compression", () => {
  beforeEach(async () => {
    const image = await fs.readFile("images/SantaClausVillage-UHD.jpg");
    console.log("img: ", image);
  });
  test("compression returns a File type object", () => {});
});
