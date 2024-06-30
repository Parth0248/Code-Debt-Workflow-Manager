// This function processes the issues from the GitLab API and new issues from the Data file.
import deleteClosedIssue from "./deleteClosedIssue.js";
import updateExistingIssue from "./updateExistingIssue.js";
const processIssue = (issueData, currentGitLabIssues) => {
  // rearrange currentGitLabIssues to match the format of issueData
  try {
    const formattedGitLabIssues = currentGitLabIssues.map((issue) => {
      return {
        title: issue.title,
        message: issue.description,
        username: issue.assignees.map((assignee) => assignee.username),
        type: issue.labels.map((label) => label),
        state: issue.state,
        gitLabID: issue.id,
      };
    });

    // Delete the closed issues from the issueData
    const cleanIssueData = deleteClosedIssue(issueData, formattedGitLabIssues);

    // Update the existing issues with the GitLabId
    const updatedIssueData = updateExistingIssue(
      cleanIssueData,
      formattedGitLabIssues
    );
    // Find the new issues which dont contain GitLabId in the updatedIssueData
    const newIssues = updatedIssueData.filter((issue) => {
      return !issue.gitLabID;
    });

    return newIssues;
  } catch (err) {
    console.error("Error processing issues: ", err);
  }
};

export default processIssue;
