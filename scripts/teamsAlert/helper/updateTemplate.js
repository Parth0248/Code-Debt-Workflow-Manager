import findIndices from "./findIndices.js";
import fixExtraMessageBlock from "./fixExtraMessageBlock.js";
import fixPendingTasksBlock from "./fixPendingTasksBlock.js";

const updateTemplate = (
  cardTemplate,
  pendingTaskCount,
  pendingTaskContent,
  extraMessage,
) => {
  let updatedTemplate = cardTemplate;
  const items = updatedTemplate.body[0].items;

  // Find initial indices
  let { messageIndex, pendingTaskIndex, containerIndex } = findIndices(items);

  // Fix the extra message block
  updatedTemplate = fixExtraMessageBlock(
    updatedTemplate,
    messageIndex,
    extraMessage,
  );

  // Update indices after fixing the extra message block
  ({ messageIndex, pendingTaskIndex, containerIndex } = findIndices(
    updatedTemplate.body[0].items,
  ));

  // Fix the pending tasks block
  updatedTemplate = fixPendingTasksBlock(
    updatedTemplate,
    pendingTaskCount,
    pendingTaskContent,
    pendingTaskIndex,
    containerIndex,
  );

  return updatedTemplate;
};

export default updateTemplate;
