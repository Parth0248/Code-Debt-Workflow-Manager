import update from "immutability-helper";
import setCritical from "./setCritical.js";

const fixPendingTasksBlock = (
  template,
  pendingTaskCount,
  pendingTaskContent,
  pendingTaskIndex,
  containerIndex,
) => {
  let updatedTemplate = template;

  if (pendingTaskCount > 0 && pendingTaskIndex !== -1) {
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            [pendingTaskIndex]: {
              $set: {
                type: "TextBlock",
                text: `You have ${pendingTaskCount} pending task left in this file!`,
                wrap: true,
                weight: "bolder",
                size: "medium",
                spacing: "medium",
              },
            },
          },
        },
      },
    });
  } else if (pendingTaskIndex !== -1) {
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            $splice: [[pendingTaskIndex, 1]],
          },
        },
      },
    });
    containerIndex -= 1;
  }

  if (pendingTaskCount > 0 && containerIndex !== -1) {
    const formattedPendingTaskContent = setCritical(pendingTaskContent);
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            [containerIndex]: {
              $set: {
                type: "Container",
                spacing: "Medium",
                items: [
                  {
                    type: "TextBlock",
                    text: "Other pending tasks in this file:",
                    weight: "bolder",
                    size: "medium",
                    color: "warning",
                    wrap: true,
                    spacing: "small",
                  },
                  {
                    type: "TextBlock",
                    text: formattedPendingTaskContent,
                    isSubtle: true,
                    wrap: true,
                    spacing: "Small",
                  },
                ],
                bleed: true,
                style: "emphasis",
              },
            },
          },
        },
      },
    });
  } else if (containerIndex !== -1) {
    updatedTemplate = update(updatedTemplate, {
      body: {
        0: {
          items: {
            $splice: [[containerIndex, 1]],
          },
        },
      },
    });
  }

  return updatedTemplate;
};

export default fixPendingTasksBlock;
