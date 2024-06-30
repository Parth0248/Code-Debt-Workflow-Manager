import update from 'immutability-helper';

const updatePendingTasks = (cardTemplate, pendingTasks) => {
  const target = "Container";
  const pendingTaskContent = pendingTasks.map((t) => `- ${t}`).join("\n");

  const updatedBody = cardTemplate.body.map((item, index) => {
    if (item.type === target && item.items) {
      const updatedItems = item.items.map((subItem, subIndex) => {
        if (subItem.type === target) {
          return update(subItem, {
            items: {
              1: {
                text: { $set: pendingTaskContent }
              }
            }
          });
        }
        return subItem;
      });
      return update(item, {
        items: { $set: updatedItems }
      });
    }
    return item;
  });

  return update(cardTemplate, {
    body: { $set: updatedBody }
  });
};

export default updatePendingTasks;
