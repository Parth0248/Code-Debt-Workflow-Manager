import { NEW_TASKS_PATH } from "../utils/filePath.js";
import fs from "fs";

const updateNewIssue = (issueData, newGitLabIssueData) => {
  const newGitLabIssueMap = newGitLabIssueData.reduce((acc, issue) => {
    if (!issue) return acc;
    acc[issue.title] = issue.id;
    return acc;
  }, {});

  const newIssueData = issueData.map((issue) => {
    const matchingIssue = newGitLabIssueMap[issue.title];
    if (matchingIssue) {
      return {
        ...issue,
        gitLabID: matchingIssue,
      };
    }
    return issue;
  });
  fs.writeFileSync(NEW_TASKS_PATH, JSON.stringify(newIssueData, null, 2));
};

export default updateNewIssue;
