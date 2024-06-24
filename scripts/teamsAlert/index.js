import { TASKS_FILE_PATH } from "./utils/filepath.js";
import sendAlert from "./helper/sendAlert.js";
import fs from "fs";

// Read JSON file
const tasks = JSON.parse(fs.readFileSync(TASKS_FILE_PATH, "utf8"));

// Function to send adaptive cards
sendAlert(tasks);
