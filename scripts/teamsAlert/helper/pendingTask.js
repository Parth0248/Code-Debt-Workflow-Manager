// Creates a map of pending tasks titles and file for each user and stores it in pendingTaskCount map
const pendingTask = (pendingTasks, tasks) => {
  tasks.forEach((task) => {
    const key = `${task.username}:${task.file}`;
    if (!pendingTasks.has(key)) {
      pendingTasks.set(key, []);
    }
    const userTasks = pendingTasks.get(key);
    userTasks.push(task);
  });
};

export default pendingTask;
