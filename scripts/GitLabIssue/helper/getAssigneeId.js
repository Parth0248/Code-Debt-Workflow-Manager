import fs from "fs";
import path from "path";

import { ASSIGNEE_ID_PATH } from "../utils/filePath.js";

const getAssigneeID = (username) => {
  const __dirname = path.resolve(path.dirname(""));
  const assigneeData = fs.readFileSync(path.join(__dirname, ASSIGNEE_ID_PATH));

  const assignees = JSON.parse(assigneeData);
  const assignee = assignees.find(
    (assignee) => assignee.username.toLowerCase() === username.toLowerCase(),
  );

  return assignee.id;
};

export default getAssigneeID;
