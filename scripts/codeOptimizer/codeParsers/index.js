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
  let todos = [];
  // comments is a map, where key is file path and value is the comments in the file
  // check tags of comments and extract based on the tag asyncronously
  // console.log( comments );
  for (const filePath of comments.keys()) {
    const fileComments = comments.get(filePath);
    console.log( fileComments );
    const todoComments = extractTODO(fileComments, filePath);
    // const fixmeComments = extractFIXME(fileComments);
    if(todoComments){
        todos.push(todoComments);
    }
    
  }
  return todos;
};

// getCommentsFromDirectory('/Users/parth.maradia/Project/Intern Project/source code/src');

export default getCommentsFromDirectory;
