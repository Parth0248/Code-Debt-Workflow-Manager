import { generateUniqueId } from "../utils/generateUniqueId.js";
import FixmePattern from "../syntax/fixmePattern.js";

const fixmePattern = new FixmePattern();
const TYPE = fixmePattern.type;
const regexArray = Object.values(fixmePattern.getParserPatterns());

const processEntry = async (entry, fullPath, generateUniqueId, TYPE) => {
  for (const regexPattern of regexArray) {
    const match = regexPattern.exec(entry);
    if (match) {
      const userName = match[1];
      const days = match[3];
      const title = match[4].replace(/^\s*\*+/gm, "").trim();
      const message = match[5]?.replace(/^\s*\*+/gm, "").trim() || "";
      const id = generateUniqueId(TYPE, userName, title);

      const [day, month, year] = match[2].split("-");
      const dateObj = new Date(`${year}-${month}-${day}`);
      const epochDate = dateObj.getTime();

      return {
        id: id,
        type: TYPE,
        username: userName,
        date: epochDate,
        days: days,
        title: title,
        message: message,
        file: fullPath,
      };
    }
  }
  return null;
};

const extractFIXME = async (content, fullPath) => {
  const promises = content.map((entry) =>
    processEntry(entry, fullPath, generateUniqueId, TYPE),
  );
  const results = await Promise.all(promises);

  const comments = results.filter((result) => result !== null);
  return comments;
};

export default extractFIXME;
