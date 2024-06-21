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
          'PRIVATE-TOKEN': ACCESS_TOKEN ,
          'Content-Type': 'application/json'
        }
      });
      
      const filteredIssues = response.data.filter(issue => {
        const label = issue.labels.toLowerCase();
        return commentTypes.some(type => label.includes(type.toUpperCase()));
      });
      console.log(filteredIssues);
      
      storeIssue(response.data);
      
      return response.data;

    } catch (error) {
      console.error('Error fetching issues:', error.response ? error.response.data : error.message);
    }
}

export default getGitLabIssues;


// https://gitlab.com/api/v3/projects/:id/issues?state=all&iid=<integer>&labels=<string>&milestone=<string>&order_by=created_at&sort=desc&page=<integer>&per_page=<integer>&private_token=<API Key>',

// const getIssues = async (repoFullName, accessToken) => {
//   try {
//     const response = await axios.get(
//       `https://api.github.com/repos/${repoFullName}/issues`,
//       {
//         headers: {
//           Authorization: `token ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     console.error("Error fetching issues:", err.response.data);
//     return null;
//   }
// };

// export default getIssues;
