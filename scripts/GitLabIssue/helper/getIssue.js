// Function to get the list of issues for a project
import axios from "axios";

const getIssues = async (repoFullName, accessToken) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoFullName}/issues`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching issues:", err.response.data);
    return null;
  }
};

export default getIssues;
