import fs from "fs";
import ensureDirectoryExistence from "./createDirectory.js";

const flushComments = (comments, filePath) => {
  ensureDirectoryExistence(filePath);
  const commentsArray = Array.from(comments.values()).flat();
  fs.writeFileSync(filePath, JSON.stringify(commentsArray, null, 2), "utf8");
  console.log("Comments saved to", filePath);
};

export default flushComments;
