import fetchComments from "./parsers/index.js";
import generateReport from "./reporting/generateReport.js";
import getAbsolutePath from "./helper/getAbsPath.js";
import config from "../configs/config.js";

const sourceCodePath = config.SRC_DIR;

(async () => {
  try {
    const absolutePath = getAbsolutePath(sourceCodePath);
    const codeCommentList = await fetchComments(absolutePath); // waits till all comments are fetched and processed
    generateReport(codeCommentList);
  } catch (error) {
    console.error("Error:", error);
  }
})(sourceCodePath);
