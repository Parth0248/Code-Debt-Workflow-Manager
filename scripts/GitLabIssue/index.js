import { configDotenv } from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";

// import getProjects from "./helper/getProjects.js";  // Find a way to fetch project names with just access token
import getIssue from "./helper/getIssue.js";

configDotenv(); // Load environment variables from .env file
const ACCESS_TOKEN = process.env.GITLAB_PROJECT_ACCESS_TOKEN;
const PROJECT_NAME = process.env.GITLAB_PROJECT_NAME;

try {
  const projects = await getProjects(ACCESS_TOKEN); 
  const issues = await getIssue(PROJECT_NAME, ACCESS_TOKEN);
  console.log(issues);
} catch (err) {
  console.error("Error fetching projects");
}

// const command = "curl --header PRIVATE-TOKEN: " + GITLAB_PROJECT_ACCESS_TOKEN + "https://"
