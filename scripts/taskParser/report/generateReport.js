import fs from "fs";

import { todo_new_path, todo_old_path } from "./filepath.js";

import ensureDirectoryExistence from "./ensureDirectory.js";

import saveCommentsToFile from "./saveComment.js";

const generateReport = (comments) => {
  try {
    if (!fs.existsSync(todo_old_path) && !fs.existsSync(todo_new_path)) {
      ensureDirectoryExistence(todo_old_path);
      saveCommentsToFile(comments, todo_old_path);
    } else if (fs.existsSync(todo_old_path) && !fs.existsSync(todo_new_path)) {
      ensureDirectoryExistence(todo_new_path);
      fs.writeFileSync(todo_new_path, "", "utf8");
      saveCommentsToFile(comments, todo_new_path);
    } else {
      ensureDirectoryExistence(todo_new_path); // Ensure directory before reading
      const oldContent = fs.existsSync(todo_new_path)
        ? fs.readFileSync(todo_new_path, "utf8")
        : "";
      ensureDirectoryExistence(todo_old_path);
      fs.writeFileSync(todo_old_path, oldContent, "utf8");
      saveCommentsToFile(comments, todo_new_path);
    }
  } catch (error) {
    console.error("Error generating report:", error);
  }
};

export default generateReport;
