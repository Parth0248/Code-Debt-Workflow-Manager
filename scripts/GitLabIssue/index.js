import { configDotenv } from "dotenv";

import { ISSUE_DATA_PATH } from "./utils/filePath.js";

// import getProjects from "./helper/getProjects.js";  // Find a way to fetch project names with just access token
import getGitLabIssue from "./helper/getIssue.js";
import createGitLabIssue from "./helper/createIssue.js";
import getIssuesData from "./helper/getIssueData.js";
import processIssue from "./helper/processIssue.js";
import getGitLabProjectMembers from "./helper/getAssignees.js";

configDotenv(); // Load environment variables from .env file
const ACCESS_TOKEN = process.env.GITLAB_PROJECT_ACCESS_TOKEN;
const PROJECT_ID = process.env.GITLAB_PROJECT_ID;

try {
  // fetch the project members and store them in a file
  getGitLabProjectMembers(ACCESS_TOKEN, PROJECT_ID);

  // fetch the issues from Comments-Manager/scripts/codeOptimizer/data/todo_new.json and store them in issueData
  const issueData = await getIssuesData(ISSUE_DATA_PATH);

  // Fetch the Issues from GitLab and store them in currentGitLabIssues
  const currentGitLabIssues = await getGitLabIssue(ACCESS_TOKEN, PROJECT_ID);

  // process issuesData and find the issues that are not already in the project
  const newIssues = await processIssue(issueData, currentGitLabIssues);

  // Create the new issues in the project CURRENTLY TESTING FOR 1 issue
  createGitLabIssue(newIssues[0], ACCESS_TOKEN, PROJECT_ID);
} catch (err) {
  console.error("Error fetching projects: ", err);
}

// const command = "curl --header PRIVATE-TOKEN: " + GITLAB_PROJECT_ACCESS_TOKEN + "https://"
