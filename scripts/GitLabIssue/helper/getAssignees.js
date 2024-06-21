import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { ASSIGNEE_ID_PATH } from "../utils/filePath.js";


async function getGitLabProjectMembers(ACCESS_TOKEN, PROJECT_ID) {
    const url = `https://gitlab.com/api/v4/projects/${PROJECT_ID}/members`;
    const __dirname = path.resolve(path.dirname(''));

    try {
        const response = await axios.get(url, {
            headers: {
                'PRIVATE-TOKEN': ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        
        // Extract and store member IDs, usernames, and email IDs
        const members = response.data.map(member => ({
            username: member.username,
            name: member.name,
            id: member.id
        }));
        console.log('Members:', members);
        
        // Store the members in a file
        fs.writeFileSync(path.join(__dirname, ASSIGNEE_ID_PATH), JSON.stringify(members, null, 2));

    } catch (error) {
        console.error('Error fetching project members:', error.response ? error.response.data : error.message);
        return [];
    }
}

export default getGitLabProjectMembers;
