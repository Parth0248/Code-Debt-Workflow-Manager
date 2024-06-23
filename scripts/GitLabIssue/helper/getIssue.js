import axios from "axios";
import fs from "fs";
import path from "path";

import commentTypes from "../../codeOptimizer/utils/commentTypes.js";

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
      const label = issue.labels.toLowerCase();
      return commentTypes.some((type) => label.includes(type.toUpperCase()));
    });

    storeIssue(response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching issues:",
      error.response ? error.response.data : error.message,
    );
  }
}

export default getGitLabIssues;
