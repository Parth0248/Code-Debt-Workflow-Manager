import sendAlert from "./helper/sendAlert.js";
import fs from "fs";
import config from "../configs/config.js";

const TASKS_FILE_PATH = config.OUTPUT_DIR + "/new_tasks.json";

try {
  // Attempt to read and parse the JSON file
  const tasks = JSON.parse(fs.readFileSync(TASKS_FILE_PATH, "utf8"));

  // Function to send adaptive cards
  sendAlert(tasks);
} catch (error) {
  console.error("An error occurred:", error);
}
