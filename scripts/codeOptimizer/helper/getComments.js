import fs from "fs";
import extractComments from "./extractComments.js";
import pLimit from "p-limit";

// Set the concurrency limit
const limit = pLimit(1000);

const getComments = async (files) => {
  const commentsMap = new Map();
  const failedFiles = [];

  const parseFile = async (file) => {
    try {
      const content = await fs.promises.readFile(file, "utf-8");
      const fileComments = extractComments(content);

      if (fileComments && fileComments.trim().length > 0) {
        console.log(`Comments found in file: ${file}`)
        commentsMap.set(file, fileComments);
      }
    } catch (error) {
      console.error(`Error occurred while parsing file: ${file}`, error);
      failedFiles.push(file);
    }
  };

  const parseAllFiles = async () => {
    const promises = files.map((file) => limit(() => parseFile(file)));
    await Promise.all(promises);
  };

  await parseAllFiles();

  if (commentsMap.size === 0) {
    console.log("No comments found in any file");
  }

  if (failedFiles.length > 0) {
    console.log("Failed to parse the following files:");
    failedFiles.forEach((file) => console.log(file));
  }

  return commentsMap;
};

export default getComments;
