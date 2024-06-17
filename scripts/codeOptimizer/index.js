import getCommentsFromDirectory from "./codeParsers/index.js"; // We automatically go to index.js of any folder, we can safely remove it from imports
import generateReport from "./report/generateReport.js";
let comments; // Avoid the use of 'let'. use only 'const'

const source_code_path = process.argv[2];
getCommentsFromDirectory(source_code_path)
  .then((result) => {
    comments = result;
    return generateReport(comments);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
