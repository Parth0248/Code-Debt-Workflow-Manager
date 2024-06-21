// Function to get the list of issues for a project
import axios from "axios";
import dotenv from "dotenv";

import getAssigneeID from "./getAssigneeId.js";

async function createGitLabIssue(issueData, ACCESS_TOKEN, PROJECT_ID) {
    const url = `https://gitlab.com/api/v4/projects/${PROJECT_ID}/issues`;
    // {
    //     "id": "8f445cedb5b51441fa331d7f2116be3fd7bc9a3cd4399683c2852f6434430811",
    //     "type": "TODO",
    //     "username": "user3",
    //     "date": 1720224000000,
    //     "days": "1",
    //     "title": "Update documentation",
    //     "message": "Finish it asap",
    //     "file": "/Users/parth.maradia/Project/Intern Project/source code/src/App.test.tsx",
    //     "created_at": 1718606109942
    //   },
    // Format of issueData
    const issueDate = new Date(issueData.date);
    issueDate.setDate(issueDate.getDate() + issueData.days);
    const formattedDate = issueDate.toISOString().split('T')[0];
    
    // find the assignee ID from the members file

    const assignee_id = getAssigneeID(issueData.username);
    if(!assignee_id) {
        console.error('Assignee not found');
        return;
    }

    const loadData = {
        title: issueData.title,
        description: issueData.message,
        labels: [issueData.type],
        due_date: formattedDate,
        assignee_id: assignee_id
    };
    console.log(loadData)

    try {
        const response = await axios.post(url, loadData, {
            headers: {
                'PRIVATE-TOKEN': ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Issue created: ${response.data.web_url}`);
    } catch (error) {
        console.error('Error creating issue:', error.response ? error.response.data : error.message);
    }
}

export default createGitLabIssue;