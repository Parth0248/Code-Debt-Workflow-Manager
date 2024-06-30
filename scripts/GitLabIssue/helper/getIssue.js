import axios from "axios";
import fs from "fs";
import path from "path";
import config from "../../configs/config.js";
const commentTypes = config.TASK_TYPE;
import storeIssue from "./storeIssue.js";

async function getGitLabIssues(ACCESS_TOKEN, PROJECT_ID) {
  const url = `https://gitlab.com/api/v4/projects/${PROJECT_ID}/issues`;

  try {
    const response = await axios.get(url, {
      headers: {
        "PRIVATE-TOKEN": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const filteredIssues = response.data.filter((issue) => {
      const label = issue.labels;
      return commentTypes.some((type) => label.includes(type.toUpperCase()));
    });

    storeIssue(filteredIssues);

    return filteredIssues;
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response ? error.response.data : error.message,
    );
  }
}

export default getGitLabIssues;
