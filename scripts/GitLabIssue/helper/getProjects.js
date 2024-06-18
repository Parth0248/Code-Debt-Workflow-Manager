import axios from "axios";

const getProjects = async (accessToken) => {
  try {
    const response = await axios.get('https://gitlab.com/api/v4/projects?owned=true', {
      headers: {
        'Private-Token': accessToken,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching projects:', err.response.data);
    return null;
  }
};

export default getProjectNames;
