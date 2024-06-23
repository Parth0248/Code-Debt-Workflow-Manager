import axios from "axios";

class WebhookTarget {
  constructor(webhook) {
    this.webhook = webhook;
  }

  sendMessage(text) {
    return axios.post(
      this.webhook.toString(),
      {
        text: text,
      },
      {
        headers: { "content-type": "application/json" },
      },
    );
  }

  sendAdaptiveCard(card) {
    return axios.post(
      this.webhook.toString(),
      {
        type: "message",
        attachments: [
          {
            contentType: "application/vnd.microsoft.card.adaptive",
            contentUrl: null,
            content: card,
          },
        ],
      },
      {
        headers: { "content-type": "application/json" },
      },
    );
  }
}

export default WebhookTarget;
