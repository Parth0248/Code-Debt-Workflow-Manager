import fs from "fs";
import extractComments from "./extractComments.js";
import async from "async";

const CONCURRENCY_LIMIT = 1000;
const commentsMap = new Map();
const failedFiles = [];

const parseFile = (file, callback) => {
  fs.readFile(file, "utf-8", (error, content) => {
    if (error) {
      console.error(`Error occurred while parsing file: ${file}`, error);
      failedFiles.push(file);
      return callback(null);
    }
    const fileComments = extractComments(content);
    if (fileComments && fileComments.trim().length > 0) {
      commentsMap.set(file, fileComments);
    }
    callback(null);
  });
};

const getComments = async (files) => {
  await new Promise((resolve) => {
    async.mapLimit(files, CONCURRENCY_LIMIT, parseFile, () => {
      resolve();
    });
  });

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
