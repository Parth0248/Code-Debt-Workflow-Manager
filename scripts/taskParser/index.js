import getCommentsFromDirectory from "./parsers/index.js";
import generateReport from "./report/generateReport.js";
import getAbsolutePath from "./helper/getAbsPath.js";

const sourceCodePath = process.argv[2];

if (!sourceCodePath) {
  console.error("Please provide the path to the source code directory");
  process.exit(1);
}
const absolutePath = getAbsolutePath(sourceCodePath);
getCommentsFromDirectory(absolutePath)
  .then((result) => {
    generateReport(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
