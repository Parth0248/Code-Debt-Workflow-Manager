import commentTypes from "../../../codeOptimizer/utils/commentTypes";
import commentRegex from "../../../codeOptimizer/utils/commentRegex";

const TAG_REGEX = new RegExp(`(${Object.values(commentTypes).join("|")})`);

const COMMENT_REGEX = {
  [commentTypes.todo]: commentRegex[commentTypes.todo],
  [commentTypes.fixme]: commentRegex[commentTypes.fixme],
  [commentTypes.dp]: commentRegex[commentTypes.dp],
};

export { TAG_REGEX, COMMENT_REGEX };
