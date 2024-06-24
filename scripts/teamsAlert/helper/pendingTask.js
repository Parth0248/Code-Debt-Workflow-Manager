// Creates a map of pending tasks titles for each user and stores it in pendingTaskCount map
const pendingTask = (pendingTaskCount, tasks) => {
  tasks.forEach((task) => {
    if (!pendingTaskCount.has(task.username)) {
      pendingTaskCount.set(task.username, []);
    }
    const userTasks = pendingTaskCount.get(task.username);
    userTasks.push(task);
  });
};

export default pendingTask;
