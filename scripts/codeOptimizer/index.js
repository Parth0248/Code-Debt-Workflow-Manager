import getCommentsFromDirectory from "./codeParsers/index.js";
import generateReport from "./report/generateReport.js";
let comments;

const source_code_path = process.argv[2];
getCommentsFromDirectory(source_code_path)
    .then((result) => {
        comments = result;
        return generateReport(comments);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
// export { getCommentsFromDirectory, generateReport};