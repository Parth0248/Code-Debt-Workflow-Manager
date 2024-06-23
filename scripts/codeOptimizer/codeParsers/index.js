// Extracts list of files from the directory and subdirectories, parses them and returns comments

import getFiles from "../helper/getFiles.js";
import getComments from "../helper/getComments.js";
import extractTODO from "./Todo.js";
// import extractFIXME from "./Fixme";
// import extractDP from "./DP";

// Define an array of extractors
const extractors = [
  { name: "TODO", extract: extractTODO },
  // { name: 'FIXME', extract: extractFIXME },
  // { name: 'DP', extract: extractDP },
];

const getCommentsFromDirectory = async (directory) => {
  const files = await getFiles(directory);
  const comments = await getComments(files); // A Map, where key is file path and value is the comments in the file
  const taskList = [];

  // Since extract function is async, we need to use for..of loop to wait for the function to complete
  for (const [filePath, fileComments] of comments.entries()) {
    for (const { name, extract } of extractors) {
      const extractedComments = await extract(fileComments, filePath);
      if (extractedComments.length > 0) {
        taskList.push(...extractedComments);
      }
    }
  }
  return taskList;
};

export default getCommentsFromDirectory;
