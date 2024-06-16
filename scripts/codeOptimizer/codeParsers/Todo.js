import REGEX_MAP from "../utils/commentRegex.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";
import getCommentType from "../helper/getCommentType.js";

const extractTODO = (content, fullPath) => {
  const type = "TODO";
  const regex = REGEX_MAP[type].regex;
  const multiLineRegex = REGEX_MAP[type].multiLineRegex;
  const multiLineStarRegex = REGEX_MAP[type].multiLineStarRegex;

  const comments = []; // Initialize comments array

  let match;
  // Check for single line, multi line and multi line with star comments
  while (
    (match = regex.exec(content)) !== null ||
    (match = multiLineRegex.exec(content)) !== null ||
    (match = multiLineStarRegex.exec(content)) !== null
  ) {
    // obtain the full path of the file using 
    const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
    const [day, month, year] = match[2].split("-"); // Assuming DD-MM-YYYY format
    const dateObj = new Date(`${year}-${month}-${day}`);
    const epochDate = dateObj.getTime(); // Epoch time in milliseconds

    // Get current timestamp in epoch format
    const currentDate = new Date().getTime();

    comments.push({
      id: id,
      type: type,
      username: match[1],
      date: epochDate,
      days: match[3],
      title: match[4].trim(),
      message: match[5]?.trim() || "",
      file: fullPath,
      // line: content.substr(0, match.index).split("\n").length,
      created_at: currentDate, // Add the created_at field
    });

    // Move the index to avoid infinite loop
    content = content.slice(match.index + match[0].length);
  }

  return comments;
};

export default extractTODO;
