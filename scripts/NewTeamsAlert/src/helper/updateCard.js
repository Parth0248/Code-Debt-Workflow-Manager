// Update the card content with task details

const updateCard = (cardTemplate, task, pending) => {
  cardTemplate.body = cardTemplate.body.map(item => {
    if (item.text) {
      const shortFilePath = task.file.split('/').slice(-1).join('/');
      item.text = item.text.replace('${username}', task.username)
               .replace('${days}', task.days)
               .replace('${type}', task.type.toUpperCase())
               .replace('${title}', task.title)
               .replace('${file}', (shortFilePath))
               .replace('${message}', task.message)
               .replace('${pendingTasks}', pending);
    }
    
    // console.log(task.file)
    // item.items.forEach(item => {
    //   if (item.type === 'ColumnSet') {
    //     item.columns = item.columns.map(column => {
    //       if (column.items) {
    //         column.items = column.items.map(actionItem => {
    //           if (actionItem.type === 'ActionSet' && actionItem.actions) {
    //             actionItem.actions = actionItem.actions.map(action => {
    //               // console.log("Task log", task.file, fullFilePath);
    //               if (action.url) {
    //                 action.url = action.url.replace('${fullFilePath}', task.file);
    //               }
    //               return action;
    //             });
    //           }
    //           return actionItem;
    //         });
    //       }
    //       return column;
    //     });
    //   }
    // });
    return item;
  }
  );

  cardTemplate.msteams.entities = cardTemplate.msteams.entities.map(entity => {
    if (entity.text) {
      entity.text = entity.text.replace('${username}', task.username);
    }
    return entity;
  });

  return cardTemplate;
};

export default updateCard;

