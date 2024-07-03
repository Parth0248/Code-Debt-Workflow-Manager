import { generateUniqueId } from "../utils/generateUniqueId.js";
import DpPattern from "../syntax/dpPattern.js";

const dpPattern = new DpPattern();
const TYPE = dpPattern.type;
const regexArray = Object.values(dpPattern.getParserPatterns());

const getDays = (duration) => {
  const number = duration.split(/(?=[A-Z])/)[0];
  const unit = duration.slice(-1);
  if (unit === "W") {
    return String(number * 7);
  } else if (unit === "M") {
    return String(number * 30);
  } else if (unit === "D") {
    return String(number);
  }
};

const processEntry = async (entry, fullPath, generateUniqueId, TYPE) => {
  for (const regexPattern of regexArray) {
    const match = regexPattern.exec(entry);
    if (match) {
      const userName = match[1];
      const days = getDays(match[3]); // Days is in format <days><W|M|D>
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

const extractTODO = async (content, fullPath) => {
  const promises = content.map((entry) =>
    processEntry(entry, fullPath, generateUniqueId, TYPE),
  );
  const results = await Promise.all(promises);

  const comments = results.filter((result) => result !== null);
  return comments;
};

export default extractTODO;
