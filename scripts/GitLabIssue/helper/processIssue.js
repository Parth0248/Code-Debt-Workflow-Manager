import fs from "fs";
import path from "path";

const processIssue = (issueData, currentGitLabIssues) => {
    console.log(currentGitLabIssues);
    // rearrange currentGitLabIssues to match the format of issueData
    currentGitLabIssues = currentGitLabIssues.map(issue => {
        return {
            title: issue.title,
            message: issue.description,
            username: issue.assignees.map(assignee => assignee.username),
            type: issue.labels.map(label => label)
        }
    });

    const newIssues = issueData.filter(issue => {
        // add the issue if it is not in currentGitLabIssues
        console.log(issue.title, currentGitLabIssues.find(currentIssue => currentIssue.title === issue.title));
        return issue.title !== currentGitLabIssues.find(currentIssue => currentIssue.title === issue.title);
    });
    
   return newIssues;
}

export default processIssue;