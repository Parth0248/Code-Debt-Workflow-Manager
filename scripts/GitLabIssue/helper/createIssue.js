// Function to get the list of issues for a project
import axios from "axios";
import getAssigneeID from "./getAssigneeId.js";
import generateIssueLabel from "./generateIssueLabel.js";

async function createGitLabIssue(issueData, ACCESS_TOKEN, PROJECT_ID) {
  const url = `https://gitlab.com/api/v4/projects/${PROJECT_ID}/issues`;

  const issueDate = new Date(issueData.date); // Format the date
  issueDate.setDate(issueDate.getDate() + Number(issueData.days));
  const formattedDate = issueDate.toISOString().split("T")[0];

  // find the assignee ID from the members file

  const assignee_id = getAssigneeID(issueData.username.split(".").join(" "));
  if (!assignee_id) {
    return;
  }
  // attach url to description like done in HTML format
  const description =
    issueData.message +
    "  \nFile: " +
    issueData.file.split("/").slice(-4).join("/");

  const issueLabel = generateIssueLabel(issueData);

  const loadData = {
    title: issueData.title,
    description: description,
    labels: issueLabel,
    due_date: formattedDate,
    assignee_id: assignee_id,
  };

  try {
    const response = await axios.post(url, loadData, {
      headers: {
        "PRIVATE-TOKEN": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating issue:",
      error.response ? error.response.data : error.message,
    );
  }
}

export default createGitLabIssue;
