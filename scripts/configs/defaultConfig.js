// defaultConfig.js
const defaultConfig = {
  OUTPUT_DIR: "./data",
  SRC_DIR: "/Users/parth.maradia/Project/Intern-Project/Comments-Manager/",
  FILE_TYPE: [".js", ".mjs", ".cjs", ".ts", ".jsx", ".tsx", ".vue", ".coffee"],
  TASK_TYPE: ["TODO", "FIXME", "DP"],
  IGNORE_DIR: ["node_modules", "bower_components", "public"],
  SCRIPTS: ["lint", "extract_tasks", "create_issue", "send_alert"],
};

export default defaultConfig;
