const setCritical = (pendingTaskContent) => {
  const updateContent = pendingTaskContent.map((task) => {
    if (task.days < 7 && task.days >= 0) {
      return `- ${task.title} [CRITICAL]`;
    } else if (task.days < 0) {
      return `- ${task.title} [OVERDUE]`;
    }
    return `- ${task.title}`;
  });
  return updateContent.join("\n");
};
export default setCritical;


// DP : @abhishek.thakur : 05-06-2024 : 5W : check is this dynamic property is working effeciently

