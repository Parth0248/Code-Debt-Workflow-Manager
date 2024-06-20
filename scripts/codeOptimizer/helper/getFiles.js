// Fetches and returns path of all files in the directory and subdirectories and returns
//
// @param {string} directory - The directory to be checked
// @returns {Array} - The path of all files in the directory and subdirectories
//
import fs from "fs";
import path from "path";

const ALLOWED_FILE_TYPES = [
  ".js",
  ".mjs",
  ".ts",
  ".jsx",
  ".tsx",
  ".vue",
  ".coffee",
];

const getFiles = async (directory) => {
  try {
    let files = []; //We should avoid using let. We can make const array instead.
    const filesInDirectory = await fs.promises.readdir(directory);
    for (const file of filesInDirectory) {
      const filePath = path.join(directory, file);
      const stat = await fs.promises.lstat(filePath);
      if (stat.isDirectory()) {
        // If we have to add m elements to n length array. Reassigning is of the order n+m but pushing the new elements is of the order m
        files = files.concat(await getFiles(filePath)); // Recursively fetch files in subdirectories
      } else {
        const fileExtension = path.extname(filePath).toLowerCase();
        if (ALLOWED_FILE_TYPES.includes(fileExtension)) {
          files.push(filePath);
        }
      }
    }
    return files;
  } catch (error) {
    console.error("Error occurred while fetching files:", error);
    return [];
  }
};

export default getFiles;
