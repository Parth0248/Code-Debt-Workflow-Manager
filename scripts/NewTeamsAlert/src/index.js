// import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import  WebhookTarget  from "./webhookTarget.js";
import { TODO_FILE_PATH } from "./utils/filepath.js"

import fs from "fs";
import sendAlert from "./helper/sendAlert.js";



// Read JSON file
const tasks = JSON.parse(fs.readFileSync(TODO_FILE_PATH, 'utf8'));

// Function to send adaptive cards

sendAlert(tasks);
