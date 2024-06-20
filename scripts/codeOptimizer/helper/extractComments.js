// extracts comments with TODO, FIXME, DP or any other tag from the content
//
// @param {string} content - The content to be checked
// @returns {Array} - The comments in the content
//

import REGEX_MAP from "../utils/commentRegex.js";
// extract comments from the content with matching regex
const extractComments = (content) => {
  const comments = []; // Initialize comments array

  for (const type in REGEX_MAP) {
    const regex = REGEX_MAP[type].regex;
    const multiLineRegex = REGEX_MAP[type].multiLineRegex;
    const multiLineStarRegex = REGEX_MAP[type].multiLineStarRegex;

    let match;
    // Check for single line, multi line and multi line with star comments
    while (
      // What do we need a loop for?
      (match = regex.exec(content)) !== null ||
      (match = multiLineRegex.exec(content)) !== null ||
      (match = multiLineStarRegex.exec(content)) !== null
    ) {
      comments.push(match[0]);
    }

    // The above code is not readable. The below code is more readable and maintainable. We should not go after writing the shortest codes.
    // Instead, we should go after writing the cleanest code.
    while (true) {
      const singleLineMatch = regex.exec(content);
      if (singleLineMatch) {
        comments.push(singleLineMatch[0]);
        continue;
      }
      const multiLineMatch = multiLineRegex.exec(content);
      if (multiLineMatch) {
        comments.push(multiLineMatch[0]);
        continue;
      }
      const multiLineStarMatch = multiLineStarRegex.exec(content);
      if (multiLineStarMatch) {
        comments.push(multiLineStarMatch[0]);
        continue;
      }
      break;
    }
  }

  return comments.join("\n");
};
export default extractComments;
