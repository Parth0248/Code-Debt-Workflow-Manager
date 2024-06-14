// Update the card content with task details


const updateCard = async (cardTemplate, task) => {
  cardTemplate.body = cardTemplate.body.map((item) => {
    if (item.text) {
      item.text = item.text
        .replace("${title}", task.title)
        .replace("${message}", task.message)
        .replace("${type}", task.type.toUpperCase())
        .replace("${days}", task.days)
        .replace("${file}", task.file);
    }
    return item;
  });
};

export default updateCard;