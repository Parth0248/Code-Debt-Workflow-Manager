import defaultConfig from "./defaultConfig.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const envPath = path.resolve("./scripts/configs/.config.env");

const setConfig = (configArg = {}) => {
  const config = {
    OUTPUT_DIR: configArg.outputDir || defaultConfig.OUTPUT_DIR,
    SRC_DIR: configArg.srcDir || defaultConfig.SRC_DIR,
    FILE_TYPE: configArg.fileTypes || defaultConfig.FILE_TYPE,
    TASK_TYPE: configArg.taskType || defaultConfig.TASK_TYPE,
    IGNORE_DIR: configArg.ignoreDir || defaultConfig.IGNORE_DIR,
    SCRIPTS: configArg.scripts || defaultConfig.SCRIPTS,
  };
  // Convert config object to .env string format
  const envString = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  fs.writeFileSync(envPath, envString);
  return config;
};

export default setConfig;
