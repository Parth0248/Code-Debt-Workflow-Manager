const findIndices = (items) => {
  const messageIndex = items.findIndex((item) => item.text === "${message}");
  const pendingTaskIndex = items.findIndex(
    (item) =>
      item.text === "You have ${pendingTasks} pending tasks left in this file!"
  );
  const containerIndex = items.findIndex(
    (item) =>
      item.type === "Container" &&
      item.items.some((subItem) => subItem.text === "${pendingTaskContent}")
  );

  return { messageIndex, pendingTaskIndex, containerIndex };
};
export default findIndices;
