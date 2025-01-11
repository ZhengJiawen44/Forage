import fs from "node:fs";

async function getFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("test/images/SantaClausVillage-UHD.jpg", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

const file = getFile().then((value) => {
  console.log(value);
});
