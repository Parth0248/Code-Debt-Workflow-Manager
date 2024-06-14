// Function to send adaptive cards
import dotenv from "dotenv";
dotenv.config();  // Load environment variables from .env file

import template from "../adaptiveCards/adaptive-card-template.json" assert { type: "json" };
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import WebhookTarget from "../webhookTarget.js";
import updateCard from "./updateCard.js";

// Fetch the webhook URL from environment variables
const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error("WEBHOOK_URL environment variable is not set.");
}

const webhookTarget = new WebhookTarget(new URL(webhookUrl));

const sendAlert = async (tasks) => {
  const task = tasks[0];

  // Create a deep copy of the template
  const cardTemplate = JSON.parse(JSON.stringify(template));

  // Update the card content with task details
  updateCard(cardTemplate, task);

  try {
    // Send the adaptive card
    await webhookTarget.sendAdaptiveCard(
      AdaptiveCards.declare(cardTemplate).render(task)
    );
    console.log("Sent adaptive card successfully.");
  } catch (e) {
    console.log(`Failed to send adaptive card. ${e}`);
  }
};

export default sendAlert;
