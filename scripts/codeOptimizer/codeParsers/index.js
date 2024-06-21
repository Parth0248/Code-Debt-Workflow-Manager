// Extracts list of files from the directory and subdirectories, parses them and returns comments
//
// @param {string} directory - The directory to be checked
// @returns {Array} - The comments in the files
//

import getFiles from "../helper/getFiles.js";
import getComments from "../helper/getComments.js";
import extractTODO from "./Todo.js";
// import extractFIXME from "./Fixme";

const getCommentsFromDirectory = async (directory) => {
  const files = await getFiles(directory);
  const comments = await getComments(files);

  // comments is a map, where key is file path and value is the comments in the file
  // check tags of comments and extract based on the tag asyncronously

  const todoList = [...comments.entries()].reduce(
    (acc, [filePath, fileComments]) => {
      const todoComments = extractTODO(fileComments, filePath);
      if (todoComments) {
        acc.push(todoComments);
      }
      return acc;
    },
    []
  );

  return todoList;
};

export default getCommentsFromDirectory;
