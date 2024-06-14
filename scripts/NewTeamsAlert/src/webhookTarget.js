// "use strict";
// // Object.defineProperty(exports, "__esModule", { value: true });
// // exports.WebhookTarget = void 0;
// // var axios_1 = require("axios");
// import axios from "axios";

// var WebhookTarget = /** @class */ (function () {
//     /**
//      * Constructor.
//      *
//      * @param webhook - the incoming webhook URL.
//      */
//     function WebhookTarget(webhook) {
//         this.webhook = webhook;
//     }
//     /**
//      * Send a plain text message.
//      *
//      * @param text - the plain text message.
//      * @returns A `Promise` representing the asynchronous operation.
//      */
//     WebhookTarget.prototype.sendMessage = function (text) {
//         return axios_1.default.post(this.webhook.toString(), {
//             text: text,
//         }, {
//             headers: { "content-type": "application/json" },
//         });
//     };
//     /**
//      * Send an adaptive card message.
//      *
//      * @param card - the adaptive card raw JSON.
//      * @returns A `Promise` representing the asynchronous operation.
//      */
//     WebhookTarget.prototype.sendAdaptiveCard = function (card) {
//         return axios_1.default.post(this.webhook.toString(), {
//             type: "message",
//             attachments: [
//                 {
//                     contentType: "application/vnd.microsoft.card.adaptive",
//                     contentUrl: null,
//                     content: card,
//                 },
//             ],
//         }, {
//             headers: { "content-type": "application/json" },
//         });
//     };
//     return WebhookTarget;
// }());
// exports.WebhookTarget = WebhookTarget;
 "use strict";
import axios from "axios";

class WebhookTarget {
    /**
     * Constructor.
     *
     * @param {URL} webhook - the incoming webhook URL.
     */
    constructor(webhook) {
        this.webhook = webhook;
    }

    /**
     * Send a plain text message.
     *
     * @param {string} text - the plain text message.
     * @returns {Promise} A `Promise` representing the asynchronous operation.
     */
    sendMessage(text) {
        return axios.post(this.webhook.toString(), {
            text: text,
        }, {
            headers: { "content-type": "application/json" },
        });
    }

    /**
     * Send an adaptive card message.
     *
     * @param {object} card - the adaptive card raw JSON.
     * @returns {Promise} A `Promise` representing the asynchronous operation.
     */
    sendAdaptiveCard(card) {
        return axios.post(this.webhook.toString(), {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    contentUrl: null,
                    content: card,
                },
            ],
        }, {
            headers: { "content-type": "application/json" },
        });
    }
}

export default WebhookTarget;
