import fs from "fs";
import path from "path";

import { ASSIGNEE_ID_PATH } from "../utils/filePath.js";

const getAssigneeID = (username) => {
  const __dirname = path.resolve(path.dirname(""));
  const assigneeData = fs.readFileSync(path.join(__dirname, ASSIGNEE_ID_PATH));

  const assignees = JSON.parse(assigneeData);

  const assignee = assignees.find(
    (assignee) => assignee.name.toLowerCase() === username.toLowerCase(),
  );
  if (!assignee) {
    console.log("Assignee not found for ", username);
    return;
  }
  return assignee.id;
};

export default getAssigneeID;
