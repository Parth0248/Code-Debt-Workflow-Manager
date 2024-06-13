// extracts comments with TODO, FIXME, DP or any other tag from the content
//
// @param {string} content - The content to be checked
// @returns {Array} - The comments in the content
//

import REGEX_MAP from "../utils/commentRegex.js";

const extractComments = (content) => {
  const commentRegex = /(\/\*[\s\S]*?\*\/|\/\/.*)/g; // Match both single and multi-line comments
  const tagRegex = new RegExp(
    `(${Object.keys(REGEX_MAP).join("|")})`
  ); // Match any of the tags in the REGEX_MAP

  // Join the comments and replace newlines with spaces within multiline comments
  return (
    content
      .match(commentRegex)
      ?.filter((comment) => comment.match(tagRegex)) // Filter comments with tags
      .map((comment) => comment.replace(/\n\s*\*\s*/g, " ")) // Replace newlines with spaces within multiline comments
      .join("\n") || ""
  );
};

export default extractComments;


// import extractFeatures from "./extractFeatures";
// import REGEX_MAP from "../utils/commentRegex.js";

// const extractComments = (content) => {
//   const commentRegex = /(\/\*[\s\S]*?\*\/|\/\/.*)/g; // Match both single and multi-line comments
//     // extract keys from the REGEX_MAP object and join them with '|' to create a regex pattern, the regex pattern should match any of the keys
//     const tagRegex = new RegExp(
//         `(${Object.keys(REGEX_MAP).join("|")})`
//         ); // Match any of the tags in the REGEX_MAP

//   return (
//     content
//       .match(commentRegex)
//       ?.filter((comment) => comment.match(tagRegex)) // Filter comments with tags
//       .join("\n") || ""
//   ); // Join the remaining comments or return empty string if none
// };

// export default extractComments;