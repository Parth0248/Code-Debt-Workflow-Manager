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
  const todos = []; // Rename to todoList
  // comments is a map, where key is file path and value is the comments in the file
  // check tags of comments and extract based on the tag asyncronously
  // Remove unnecessary commented code from Main branch.
  // console.log( comments );

  // Check if we can use comments.reduce instead of for..of. If yes, the loop will not have a dependency outside of its scope and become pure.
  for (const filePath of comments.keys()) {
    const fileComments = comments.get(filePath);
    const todoComments = extractTODO(fileComments, filePath);
    // const fixmeComments = extractFIXME(fileComments);
    if (todoComments) {
      todos.push(todoComments);
    }
  }
  return todos;
};

// getCommentsFromDirectory('/Users/parth.maradia/Project/Intern Project/source code/src');

export default getCommentsFromDirectory;
