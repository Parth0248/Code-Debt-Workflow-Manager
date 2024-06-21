const updatePendingTasks = (cardTemplate, pendingTasks) => {
  const target = "Container";
  const pendingTaskContent = pendingTasks
    .slice(0, 3)
    .map((t) => `- ${t}`)
    .join("\n");
  cardTemplate.body = cardTemplate.body.map((item) => {
    if (item.type === target && item.items) {
      item.items = item.items.map((subItem) => {
        if (subItem.type === target) {
          subItem.items[1].text = pendingTaskContent;
        }
        return subItem;
      });
    }
    return item;
  });

  return cardTemplate;
};

export default updatePendingTasks;
