import REGEX_MAP from "../utils/commentRegex.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";
import commentTypes from "../utils/commentTypes.js";
import { forEach } from "async";

const TYPE = commentTypes.todo;
const SINGLE_LINE_REGEX = REGEX_MAP[TYPE].regex; // format
const MULTI_LINE_REGEX = REGEX_MAP[TYPE].multiLineRegex;
const MULTI_LINE_STAR_REGEX = REGEX_MAP[TYPE].multiLineStarRegex; // format
const DELIMITER = "#%";

const processEntry = async (
  entry,
  regexArray,
  fullPath,
  comments,
  generateUniqueId,
  TYPE
) => {
  for (const re of regexArray) {
    const match = re.exec(entry);
    if (match !== null) {
      const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
      const [day, month, year] = match[2].split("-"); // Assuming DD-MM-YYYY format
      const dateObj = new Date(`${year}-${month}-${day}`);
      const epochDate = dateObj.getTime(); // Epoch time in milliseconds

      comments.push({
        id: id,
        type: TYPE,
        username: match[1],
        date: epochDate,
        days: match[3],
        title: match[4].trim(),
        message: match[5]?.trim() || "",
        file: fullPath,
      });

      break; // Exit the loop if a match is found
    }
  }
};

const processEntries = async (
  commentEntries,
  regexArray,
  fullPath,
  comments,
  generateUniqueId,
  TYPE
) => {
  const promises = commentEntries.map((entry) =>
    processEntry(entry, regexArray, fullPath, comments, generateUniqueId, TYPE)
  );
  await Promise.all(promises);
};

const extractTODO = async (content, fullPath) => {
  const comments = [];
  const commentEntries = content.split(DELIMITER); // Split content by delimiter

  const regexArray = [
    SINGLE_LINE_REGEX,
    MULTI_LINE_REGEX,
    MULTI_LINE_STAR_REGEX,
  ];

  await processEntries(
    commentEntries,
    regexArray,
    fullPath,
    comments,
    generateUniqueId,
    TYPE
  );

  return comments;
};

export default extractTODO;
