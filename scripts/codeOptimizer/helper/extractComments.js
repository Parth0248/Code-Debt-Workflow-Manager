// extracts comments with TODO, FIXME, DP or any other tag from the content
//
// @param {string} content - The content to be checked
// @returns {Array} - The comments in the content
//

import REGEX_MAP from "../utils/commentRegex.js";
const DELIMITER = '#%';

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
      (match = regex.exec(content)) !== null ||
      (match = multiLineRegex.exec(content)) !== null ||
      (match = multiLineStarRegex.exec(content)) !== null
    ) {
      comments.push(match[0]);
    }
  }

  return comments.join(DELIMITER);
}

export default extractComments;
