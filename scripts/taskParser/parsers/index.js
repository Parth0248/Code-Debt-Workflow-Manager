// Extracts list of files from the directory and subdirectories, parses them and returns comments
import getFiles from "../helper/getFiles.js";
import getComments from "../helper/getComments.js";
import extractorList from "./extractorList.js";
import config from "../../configs/config.js";

const ALLOWED_TASK_TYPES = config.TASK_TYPE;
// Define an array of extractors

const fetchComments = async (directory) => {
  const files = await getFiles(directory);
  const comments = await getComments(files); // A Map, where key is file path and value is the comments in the file
  const taskList = [];

  // Since extract function is async, we need to use for..of loop to wait for the function to complete
  for (const [filePath, fileComments] of Object.entries(comments)) {
    for (const allowedType of ALLOWED_TASK_TYPES) {
      const extractor = extractorList[allowedType];
      const extractedComments = await extractor(fileComments, filePath);
      if (extractedComments.length > 0) {
        taskList.push(...extractedComments);
      }
    }
  }

  return taskList;
};

export default fetchComments;
