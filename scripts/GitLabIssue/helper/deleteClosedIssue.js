import fs from "fs";

import { OLD_TASKS_PATH } from "../utils/filePath.js";

const deleteClosedIssue = (issueData, formattedGitlabIssue) => {
  try {
    if (formattedGitlabIssue) {
      const closedIssues = formattedGitlabIssue.filter(
        (issue) => issue.state === "closed",
      );

      if (!closedIssues) return issueData;

      const oldIssues = JSON.parse(fs.readFileSync(OLD_TASKS_PATH, "utf8"));
      // Find the id of the closed issues
      const closedGitLabIssueIds = closedIssues.map((issue) => issue.gitLabID);

      // Find the closed issues from the issueData
      const closedIssuesID = oldIssues
        .filter((issue) => closedGitLabIssueIds.includes(issue.gitLabID))
        .map((issue) => issue.id);

      // Remove the closed issues from the issueData
      const newIssueData = issueData.filter(
        (issue) => !closedIssuesID.includes(issue.id),
      );

      return newIssueData;
    }
    return issueData;
  } catch (err) {
    console.error("Error deleting closed issues: ", err);
  }
};

export default deleteClosedIssue;
