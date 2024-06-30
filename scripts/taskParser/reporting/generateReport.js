import fs from "fs";

import { new_tasks_path, old_tasks_path } from "./filepath.js";

import createDirectory from "./createDirectory.js";
import flushComments from "./flushComments.js";

const generateReport = (comments) => {
  try {
    const oldPath = fs.existsSync(old_tasks_path);
    const newPath = fs.existsSync(new_tasks_path);
    if (!oldPath) {
      createDirectory(old_tasks_path);
      flushComments(comments, old_tasks_path);
    } else if (!newPath) {
      createDirectory(new_tasks_path);
      flushComments(comments, new_tasks_path);
    } else {
      const oldContent = fs.existsSync(new_tasks_path)
        ? fs.readFileSync(new_tasks_path, "utf8")
        : "";
      fs.writeFileSync(old_tasks_path, oldContent, "utf8");
      flushComments(comments, new_tasks_path);
    }
  } catch (error) {
    console.error("Error generating report:", error);
  }
};

export default generateReport;
