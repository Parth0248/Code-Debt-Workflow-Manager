import { OLD_TASKS_PATH, NEW_TASKS_PATH } from "../utils/filePath.js";
import fs from "fs";

const updateExistingIssue = (issueData, formattedGitlabIssue) => {
  try {
    if (formattedGitlabIssue) {
      // Find the open issues from the formattedGitlabIssue
      const openGitLabIssueId = formattedGitlabIssue
        .filter((issue) => issue.state === "opened")
        .map((openIssue) => openIssue.gitLabID);

      // Find the matching open issues from the old tasks
      const oldTasks = JSON.parse(fs.readFileSync(OLD_TASKS_PATH, "utf8"));

      const oldOpenIssues = oldTasks.filter((issue) =>
        openGitLabIssueId.includes(issue.gitLabID),
      );

      // Update the gitLabId in the issueData
      const updatedIssueData = issueData.map((issue) => {
        const isMatch = oldOpenIssues.find(
          (oldTask) => oldTask.id === issue.id,
        );
        if (isMatch) {
          return {
            ...issue,
            gitLabID: isMatch.gitLabID,
          };
        }
        return issue;
      });

      fs.writeFileSync(
        NEW_TASKS_PATH,
        JSON.stringify(updatedIssueData, null, 2),
      );

      return updatedIssueData;
    }
    return issueData;
  } catch (err) {
    console.error("Error updating existing issues: ", err);
  }
};

export default updateExistingIssue;
