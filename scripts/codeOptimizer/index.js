import getCommentsFromDirectory from "./codeParsers/index.js";
import generateReport from "./report/generateReport.js";
import absolutePath from "./helper/getAbsPath.js";

// Please install prettier to get all files formatted properly.

const source_code_path = process.argv[2];

if (!source_code_path) {
  console.error("Please provide the path to the source code directory");
  process.exit(1);
}
const absPath = absolutePath(source_code_path);
getCommentsFromDirectory(absPath)
  .then((result) => {
    return generateReport(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
