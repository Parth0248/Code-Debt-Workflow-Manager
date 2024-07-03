// Function to send adaptive cards
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import template from "../adaptiveCards/adaptive-card-template.json" assert { type: "json" }; // Assert used for type check [Node requirement]
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import WebhookTarget from "../webhookTarget.js";

import pendingTask from "./pendingTask.js";
import alertText from "../utils/alertText.js";
import updateTemplate from "./updateTemplate.js";
import thresholdDays from "../utils/thresholdDays.js";

// Fetch the webhook URL from environment variables
const webhookUrl = process.env.WEBHOOK_URL;
const domainName = process.env.DOMAIN_NAME;

if (!webhookUrl) {
  throw new Error("WEBHOOK_URL environment variable is not set.");
}

const webhookTarget = new WebhookTarget(new URL(webhookUrl));

const sendAlert = async (tasks) => {
  const pendingTasks = new Map();

  pendingTask(pendingTasks, tasks);

  const task = tasks[0]; // CHANGE THIS TO A LOOP TO SEND ALERT FOR ALL TASKS
  // sendAlertForTask(task, pendingTasks);

  for (const task of tasks) {
    // send alerts if task.days matches one of the thresholdDays values

    const threshold = Object.values(thresholdDays).find(
      (value) => value === Number(task.days)
    );

    if (threshold) {
      await sendAlertForTask(task, pendingTasks);
    }
  }
};

const sendAlertForTask = async (task, pendingTasks) => {
  const key = `${task.username}:${task.file}`;
  const pending = pendingTasks.get(key);

  // Create a deep copy of the template
  const cardTemplate = JSON.parse(JSON.stringify(template));

  try {
    const alertTitle = alertText(task.days);
    const userEmail = task.username + String(domainName);
    const userName = task.username.split(".")[0];

    const modifiedTask = {
      ...task,
      userEmail: userEmail,
      userName: userName,
      shortFilePath: task.file.split("/").slice(-3).join("/"),
      pendingTasks: pending.length > 0 ? pending.length - 1 : 0,
      alertMessage: alertTitle.text,
      alertColor: alertTitle.color,
    };

    const pendingTasks = Array.from(pending.values())
      .filter((task) => task.title !== modifiedTask.title)
      .map((task) => ({
        title: task.title,
        days: task.days,
        file: task.file,
      }));

    // update extra message and all pending tasks from same file to the card
    const updatedCardTemplate = updateTemplate(
      cardTemplate,
      pendingTasks.length,
      pendingTasks,
      task.message
    );

    // Send the adaptive card using the webhook
    await webhookTarget.sendAdaptiveCard(
      AdaptiveCards.declare(updatedCardTemplate).render(modifiedTask)
    );
  } catch (e) {
    console.log(`Failed to send adaptive card. ${e}`);
  }
};

export default sendAlert;
