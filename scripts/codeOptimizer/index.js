import getCommentsFromDirectory from "./codeParsers/index.js";
// import generateReport from "./report/generateReport";

console.log(process.argv[2]);
getCommentsFromDirectory(process.argv[2]);
// export { getCommentsFromDirectory, generateReport};