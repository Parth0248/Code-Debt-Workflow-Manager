"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adaptivecards_tools_1 = require("@microsoft/adaptivecards-tools");
const webhookTarget_1 = require("./webhookTarget");
const adaptive_card_template_json_1 = __importDefault(require("./adaptiveCards/adaptive-card-template.json"));
const axios = require('axios');
const fs = require('fs');
// Webhook URL
const webhookUrl = "https://sprinklr.webhook.office.com/webhookb2/a1ece563-2792-46bd-b776-a7ab28460cbb@52bc7e22-6631-4c88-9c4f-9c115c186148/IncomingWebhook/2b942d679817491c99aec38f1c82ba4a/3fa0b89b-ace6-4ab6-93e7-661d19caf2f4";
const webhookTarget = new webhookTarget_1.WebhookTarget(new URL(webhookUrl));
// Read JSON file
const tasks = JSON.parse(fs.readFileSync('../../../TodoManager/todo_new.json', 'utf8'));
// Function to send adaptive cards
const sendNotifications = (tasks, limit) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < Math.min(tasks.length, limit); i++) {
        const task = tasks[i];
        const cardContent = Object.assign(Object.assign({}, adaptive_card_template_json_1.default), { body: adaptive_card_template_json_1.default.body.map((item) => {
                if (item.text) {
                    item.text = item.text.replace('${title}', task.title)
                        .replace('${message}', task.message)
                        .replace('${type}', (task.type).toUpperCase())
                        .replace('${username}', task.username)
                        //  .replace('${date}', new Date(task.date).toLocaleDateString())
                        .replace('${days}', task.days)
                        .replace('${file}', task.file);
                    //  .replace('${line}', task.line)
                    //  .replace('${created_at}', new Date(task.created_at).toLocaleDateString());
                }
                return item;
            }) });
        try {
            yield webhookTarget.sendAdaptiveCard(adaptivecards_tools_1.AdaptiveCards.declare(cardContent).render(task));
            console.log("Send adaptive card successfully.");
        }
        catch (e) {
            console.log(`Failed to send adaptive card. ${e}`);
        }
    }
});
// Send notifications with a limit of 2
sendNotifications(tasks, 2);
// import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
// import { WebhookTarget } from "./webhookTarget";
// import template from "./adaptiveCards/adaptive-card-template.json";
// const axios = require('axios');
// const fs = require('fs');
// /**
//  * Fill in your incoming webhook url.
//  */
// const webhookUrl: string = "https://sprinklr.webhook.office.com/webhookb2/a1ece563-2792-46bd-b776-a7ab28460cbb@52bc7e22-6631-4c88-9c4f-9c115c186148/IncomingWebhook/2b942d679817491c99aec38f1c82ba4a/3fa0b89b-ace6-4ab6-93e7-661d19caf2f4"
// const webhookTarget = new WebhookTarget(new URL(webhookUrl));
// // Read JSON file
// const tasks = JSON.parse(fs.readFileSync('../../../TodoManager/todo_new.json', 'utf8'));
// /**
// * Send adaptive cards.
// */
// webhookTarget.sendAdaptiveCard(
//     AdaptiveCards.declare(template).render(
//     {
//         "title": "New Event Occurred!",
//         "appName": "Contoso App",
//         "description": "Detailed description of what happened so the user knows what's going on.",
//         "notificationUrl" : "https://www.adaptivecards.io/"
//     }))
// .then(() => console.log("Send adaptive card successfully."))
// .catch(e => console.log(`Failed to send adaptive card. ${e}`));
//# sourceMappingURL=index.js.map