import { NEW_TASKS_PATH } from "../utils/filePath.js";
import fs from "fs";

const updateNewIssue = (issueData, newGitLabIssueData) => {
  const newGitLabIssueMap = newGitLabIssueData.reduce((acc, issue) => {
    if (!issue) return acc;
    acc[issue.title] = {
      id: issue.id,
      web_url: issue.web_url,
    };

    return acc;
  }, {});

  const newIssueData = issueData.map((issue) => {
    const matchingIssue = newGitLabIssueMap[issue.title];
    if (matchingIssue) {
      return {
        ...issue,
        gitLabID: matchingIssue.id,
        issueURL: matchingIssue.web_url,
      };
    }
    return issue;
  });
  fs.writeFileSync(NEW_TASKS_PATH, JSON.stringify(newIssueData, null, 2));
};

export default updateNewIssue;
