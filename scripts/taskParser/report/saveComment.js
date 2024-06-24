import fs from "fs";
import ensureDirectoryExistence from "./ensureDirectory.js";

const saveCommentsToFile = (comments, filePath) => {
  ensureDirectoryExistence(filePath);
  const commentsArray = Array.from(comments.values()).flat();
  fs.writeFileSync(filePath, JSON.stringify(commentsArray, null, 2), "utf8");
};

export default saveCommentsToFile;
