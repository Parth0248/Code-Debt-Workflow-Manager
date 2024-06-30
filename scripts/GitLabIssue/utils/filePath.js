import config from "../../configs/config.js";

const GITLAB_ISSUE_PATH = config.OUTPUT_DIR + "/oldGitIssues.json";
const NEW_TASKS_PATH = config.OUTPUT_DIR + "/new_tasks.json";
const ASSIGNEE_ID_PATH = config.OUTPUT_DIR + "/assigneeID.json";
const OLD_TASKS_PATH = config.OUTPUT_DIR + "/.old_tasks.json";

export { GITLAB_ISSUE_PATH, NEW_TASKS_PATH, ASSIGNEE_ID_PATH, OLD_TASKS_PATH };
