import fs from "fs";
import path from "path";
import { todo_new_path, todo_old_path } from "./filepath.js";

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

function saveCommentsToFile(comments, filePath) {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), "utf8");
}

const generateReport = async (comments) => {
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
