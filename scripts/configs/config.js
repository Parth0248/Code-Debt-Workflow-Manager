import defaultConfig from "./defaultConfig.js";
import parseCommandLineArgs from "./cliConfig.js";

const configArg = parseCommandLineArgs(process.argv);

const config = {
  OUTPUT_DIR: configArg.outputDir || defaultConfig.OUTPUT_DIR,
  SRC_DIR: configArg.srcDir || defaultConfig.SRC_DIR,
  FILE_TYPE: configArg.fileTypes || defaultConfig.FILE_TYPE,
  TASK_TYPE: configArg.taskType || defaultConfig.TASK_TYPE,
  IGNORE_DIR: configArg.ignoreDir || defaultConfig.IGNORE_DIR,
};

export default config;
