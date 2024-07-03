import update from "immutability-helper";

const encodedMessage = (message) => {
  const encodedText = message
    .replace(/\r/g, "\r\r")
    .replace(/\n/g, "\n\n") // Replace single newlines with double newlines
    .replace(/\t/g, "\t\t"); // Replace tabs with spaces in the message
  return encodedText;
};

const fixExtraMessageBlock = (template, messageIndex, extraMessage) => {
  let updatedTemplate = template;
  const message = encodedMessage(extraMessage);
  if (extraMessage && messageIndex !== -1) {
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            [messageIndex]: {
              $set: {
                type: "TextBlock",
                text: message,
                wrap: true,
                size: "medium",
                spacing: "medium",
              },
            },
          },
        },
      },
    });
  } else if (messageIndex !== -1) {
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            $splice: [[messageIndex, 1]],
          },
        },
      },
    });
  }

  return updatedTemplate;
};
export default fixExtraMessageBlock;
