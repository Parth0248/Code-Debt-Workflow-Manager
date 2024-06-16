// Function to send adaptive cards
import dotenv from "dotenv";
dotenv.config();  // Load environment variables from .env file

import template from "../adaptiveCards/adaptive-card-template.json" assert { type: "json" };
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import WebhookTarget from "../webhookTarget.js";
import updatePendingTasks from "./updatePendingTasks.js";
import pendingTask from "./pendingTask.js";

// Fetch the webhook URL from environment variables
const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error("WEBHOOK_URL environment variable is not set.");
}

const webhookTarget = new WebhookTarget(new URL(webhookUrl));

const sendAlert = async (tasks) => {
  
  const pendingTaskCount = new Map();
  
  pendingTask(pendingTaskCount, tasks);

  const task = tasks[2]; // CHANGE THIS TO A LOOP TO SEND ALERT FOR ALL TASKS
  sendAlertForTask(task, pendingTaskCount);
}

const sendAlertForTask = async (task, pendingTaskCount) => {
  
  const pending = pendingTaskCount.get(task.username);

  // Create a deep copy of the template
  const cardTemplate = JSON.parse(JSON.stringify(template));

  try {
    const modifiedTask = task;
    // add a new property to the task object to store Short File Path
    modifiedTask.shortFilePath = task.file.split('/').slice(-3).join('/');
    modifiedTask.pendingTasks = pending.length;

    const pendingTasks = Array.from(pending.values())
      .filter(task => task.title !== modifiedTask.title)
      .map(task => task.title);

    console.log("Pending tasks: ", pendingTasks);
    
    // adds max 3 pending tasks to the card
    const updatedCardTemplate = updatePendingTasks(cardTemplate, pendingTasks);
    
    await webhookTarget.sendAdaptiveCard(
      AdaptiveCards.declare(updatedCardTemplate).render(modifiedTask)
    );
    console.log("Sent adaptive card successfully.");
  } catch (e) {
    console.log(`Failed to send adaptive card. ${e}`);
  }
};

export default sendAlert;
