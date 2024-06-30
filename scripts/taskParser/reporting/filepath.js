// Store the path of the files for
import config from "../../configs/config.js";

const outputDir = config.OUTPUT_DIR;

const new_tasks_path = `${outputDir}/new_tasks.json`;
const old_tasks_path = `${outputDir}/.old_tasks.json`;

export { new_tasks_path, old_tasks_path };
