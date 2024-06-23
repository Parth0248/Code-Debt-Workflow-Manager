// Update the card content with task details

const updateCard = (cardTemplate, task, pending) => {
  cardTemplate.body = cardTemplate.body.map((item) => {
    if (item.text) {
      const shortFilePath = task.file.split("/").slice(-1).join("/");
      item.text = item.text
        .replace("${username}", task.username)
        .replace("${days}", task.days)
        .replace("${type}", task.type.toUpperCase())
        .replace("${title}", task.title)
        .replace("${file}", shortFilePath)
        .replace("${message}", task.message)
        .replace("${pendingTasks}", pending);
    }

    return item;
  });

  cardTemplate.msteams.entities = cardTemplate.msteams.entities.map(
    (entity) => {
      if (entity.text) {
        entity.text = entity.text.replace("${username}", task.username);
      }
      return entity;
    },
  );

  return cardTemplate;
};

export default updateCard;
