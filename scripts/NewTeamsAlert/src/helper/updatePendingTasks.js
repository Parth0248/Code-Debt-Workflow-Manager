const updatePendingTasks = (cardTemplate, pendingTasks) => {
  const pendingTaskContent = pendingTasks
    .slice(0, 3)
    .map((t) => `- ${t}`)
    .join("\n");
  cardTemplate.body = cardTemplate.body.map((item) => {
    if (item.type === "Container" && item.items) {
      //store 'Container' in const and use here
      item.items = item.items.map((subItem) => {
        if (subItem.type === "Container") {
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
