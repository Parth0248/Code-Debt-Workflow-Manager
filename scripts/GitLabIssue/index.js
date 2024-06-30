import { configDotenv } from "dotenv";

import { NEW_TASKS_PATH } from "./utils/filePath.js";

import getGitLabIssue from "./helper/getIssue.js";
import createGitLabIssue from "./helper/createIssue.js";
import getIssuesData from "./helper/getIssueData.js";
import processIssue from "./helper/processIssue.js";
import getGitLabProjectMembers from "./helper/getAssignees.js";
import updateNewIssue from "./helper/updateNewIssue.js";

configDotenv(); // Load environment variables from .env file
const ACCESS_TOKEN = process.env.GITLAB_PROJECT_ACCESS_TOKEN;
const PROJECT_ID = process.env.GITLAB_PROJECT_ID;

try {
  // fetch the project members and store them in a file
  await getGitLabProjectMembers(ACCESS_TOKEN, PROJECT_ID);

  // fetch the issues from data/ directory and store them in issueData
  const issueData = await getIssuesData(NEW_TASKS_PATH);
  // console.log(issueData);

  // Fetch the Issues from GitLab and store them in currentGitLabIssues
  const currentGitLabIssues = await getGitLabIssue(ACCESS_TOKEN, PROJECT_ID);

  // process issuesData and find the issues that are not already in the project
  const newIssues = await processIssue(issueData, currentGitLabIssues);

  // Create the new issues in the project CURRENTLY TESTING FOR 1 issue
  const newGitLabIssueData = await Promise.all(
    newIssues.map((issue) =>
      createGitLabIssue(issue, ACCESS_TOKEN, PROJECT_ID),
    ),
  );

  // Update the issueData with the new GitLabID
  updateNewIssue(issueData, newGitLabIssueData);
} catch (err) {
  console.error("Error fetching projects: ", err);
}
