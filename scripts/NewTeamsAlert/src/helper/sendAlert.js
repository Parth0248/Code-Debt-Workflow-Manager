// Function to send adaptive cards
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import template from "../adaptiveCards/adaptive-card-template.json" assert { type: "json" };
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import WebhookTarget from "../webhookTarget.js";
import updatePendingTasks from "./updatePendingTasks.js";
import pendingTask from "./pendingTask.js";
import alertText from "../utils/alertText.js";

// Fetch the webhook URL from environment variables
const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error("WEBHOOK_URL environment variable is not set.");
}

const webhookTarget = new WebhookTarget(new URL(webhookUrl));

const sendAlert = async (tasks) => {
  const pendingTaskCount = new Map();

  pendingTask(pendingTaskCount, tasks);

  const task = tasks[0]; // CHANGE THIS TO A LOOP TO SEND ALERT FOR ALL TASKS
  sendAlertForTask(task, pendingTaskCount);
};

const sendAlertForTask = async (task, pendingTaskCount) => {
  const pending = pendingTaskCount.get(task.username);

  // Create a deep copy of the template
  const cardTemplate = JSON.parse(JSON.stringify(template));

  try {
    const alertTitle = alertText(task.days);

    const modifiedTask = {
      ...task,
      shortFilePath: task.file.split("/").slice(-3).join("/"),
      pendingTasks: pending.length > 0 ? pending.length - 1 : 0,
      alertMessage: alertTitle.text,
      alertColor: alertTitle.color,
    };

    const pendingTasks = Array.from(pending.values())
      .filter((task) => task.title !== modifiedTask.title)
      .map((task) => task.title);

    // adds max 3 pending tasks to the card to make the Card look less cluttered
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
