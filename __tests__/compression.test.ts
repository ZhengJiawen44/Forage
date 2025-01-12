/**
 * @jest-environment jsdom
 */
import { describe } from "node:test";
import { expect, test } from "@jest/globals";

import { canvasToFile } from "@/lib/imageCompression/canvasToFile";

describe("canvasToFile", () => {
  test("converts a canvas to a file", async () => {
    const canvas = document.createElement("canvas");
    const file = await canvasToFile(canvas);
    expect(file instanceof File).toBe(true);
  });
});
