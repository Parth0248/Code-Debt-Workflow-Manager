// extracts comments with todo, fixme, dp or any other tag from the content

import TodoPattern from "../syntax/todoPattern.js";
import FixmePattern from "../syntax/fixmePattern.js";
import DpPattern from "../syntax/dpPattern.js";

const todoPattern = new TodoPattern();
const fixmePattern = new FixmePattern();
const dpPattern = new DpPattern();

const TAG_SYNTAX = [todoPattern, fixmePattern, dpPattern];

// extract comments from the content with matching regex
const extractComments = (content) => {
  const comments = []; // Initialize comments array

  TAG_SYNTAX.map((tagPattern) => {
    const RE_LIST = Object.values(tagPattern.getParserPatterns());
    let match;
    for (const re of RE_LIST) {
      while ((match = re.exec(content)) !== null) {
        comments.push(match[0]);
      }
    }
  });
  return comments;
};

export default extractComments;
