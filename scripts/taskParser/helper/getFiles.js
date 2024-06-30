// Fetches and returns path of all files in the directory and subdirectories and returns

import fs from "fs";
import path from "path";
import config from "../../configs/config.js";

const ALLOWED_FILE_TYPES = config.FILE_TYPE;
const IGNORED_DIRECTORIES = config.IGNORE_DIR;

const getFiles = async (directory) => {
  try {
    if (IGNORED_DIRECTORIES.includes(path.basename(directory))) {
      return [];
    }

    const filesInDirectory = await fs.promises.readdir(directory);

    const files = await filesInDirectory.reduce(async (accPromise, file) => {
      const acc = await accPromise;
      const filePath = path.join(directory, file);
      const stat = await fs.promises.lstat(filePath);

      if (stat.isDirectory()) {
        const subDirFiles = await getFiles(filePath); // Recursively get files from subdirectories
        return acc.concat(subDirFiles);
      } else {
        const fileExtension = path.extname(filePath).toLowerCase();
        if (ALLOWED_FILE_TYPES.includes(fileExtension)) {
          return acc.concat(filePath);
        }
        return acc;
      }
    }, Promise.resolve([]));

    // Filter the files to include only allowed file types
    return files.filter((file) => {
      const fileExtension = path.extname(file).toLowerCase();
      return ALLOWED_FILE_TYPES.includes(fileExtension);
    });
  } catch (error) {
    console.error("Error occurred while fetching files:", error);
    return [];
  }
};

export default getFiles;
