import fs from "fs";
import extractComments from "./extractComments.js";
import async from "async";
import pkg from "lodash";
const { isEmpty } = pkg;

const CONCURRENCY_LIMIT = 1000;
const failedFiles = [];

const parseFile = (file, callback) => {
  fs.readFile(file, "utf-8", (error, content) => {
    if (error) {
      console.error(`Error occurred while parsing file: ${file}`, error);
      failedFiles.push(file);
      return callback(null, {});
    }
    const fileComments = extractComments(content);
    const comments = {};
    if (!isEmpty(fileComments)) {
      comments[file] = fileComments;
    }
    callback(null, comments);
  });
};

const getComments = async (files) => {
  const commentsMap = {};
  await new Promise((resolve) => {
    async.mapLimit(files, CONCURRENCY_LIMIT, parseFile, (err, results) => {
      if (err) {
        console.error("Error parsing files: ", err);
      } else {
        results.forEach((result) => {
          Object.assign(commentsMap, result);
        });
      }
      resolve();
    });
  });

  if (isEmpty(commentsMap)) {
    console.log("No comments found in any file");
  }

  if (!isEmpty(failedFiles)) {
    console.log("Failed to parse the following files:");
    failedFiles.forEach((file) => console.log(file));
  }

  
  return commentsMap;
};

export default getComments;
