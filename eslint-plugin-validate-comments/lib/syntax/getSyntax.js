import config from "../../../scripts/configs/config.js";
import TodoPattern from "../../../scripts/taskParser/syntax/todoPattern.js";
import FixmePattern from "../../../scripts/taskParser/syntax/fixmePattern.js";
import DpPattern from "../../../scripts/taskParser/syntax/dpPattern.js";

const commentTypes = config.TASK_TYPE;
const todoPattern = new TodoPattern();
const fixmePattern = new FixmePattern();
const dpPattern = new DpPattern();

const TAG_REGEX = new RegExp(`(${Object.values(commentTypes).join("|")})`);

const COMMENT_REGEX = {
  [todoPattern.type]: todoPattern.getLintPatterns(),
  [fixmePattern.type]: fixmePattern.getLintPatterns(),
  [dpPattern.type]: dpPattern.getLintPatterns(),
};

const ERROR_MESSAGES = {
  singleLineError: `Incorrectly Formatted comment in line {{line}}:
  {{comment}}

  Correct Syntax:
  // {{tag}} : @user.name : <dd-mm-yyyy> : <days> : <title>
  `,

  multiLineError: `Incorrectly Formatted comment in line {{line}}:
  {{comment}}

  Correct Syntax:
  /* {{tag}} : @user.name : <dd-mm-yyyy> : <days> : <title>
   * <optional_text> */
  `,
};

export { TAG_REGEX, COMMENT_REGEX, ERROR_MESSAGES };
