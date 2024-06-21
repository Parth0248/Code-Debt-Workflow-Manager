import REGEX_MAP from "../utils/commentRegex.js";
import { generateUniqueId } from "../utils/generateUniqueId.js";
import getCommentType from "../helper/getCommentType.js";
import commentTypes from "../utils/commentTypes.js";

const extractTODO = (content, fullPath) => {
  const type = commentTypes[0];
  const regex = REGEX_MAP[type].regex;
  const multiLineRegex = REGEX_MAP[type].multiLineRegex;
  const multiLineStarRegex = REGEX_MAP[type].multiLineStarRegex;

  const comments = []; // Initialize comments array

  // Check for single line, multi line and multi line with star comments
  for (const re of [regex, multiLineRegex, multiLineStarRegex]) {
    const match = re.exec(content);
    if (match === null) continue;

    // Incomplete sentence. Either complete it or remove the comment
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
      // currentDate will get reset each time a file is read, even if the issue is old.
      created_at: currentDate, // Add the created_at field
    });

    // Move the index to avoid infinite loop
    // Find out the complexity of below statement. Let us discuss how this can be reduced.
    content = content.slice(match.index + match[0].length);
  }
  return comments;
};

export default extractTODO;
