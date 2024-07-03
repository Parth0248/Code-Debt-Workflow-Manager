import parseCommandLineArgs from "./configs/cliConfig.js";
import setConfig from "./configs/setConfig.js";
import { exec } from "child_process";

// Capture CLI arguments and set configuration
const cliArgs = parseCommandLineArgs(process.argv);
const config = setConfig(cliArgs);

// Runs all scripts in the order specified in the config
const runScript = (scriptName) => {
  return new Promise((resolve, reject) => {
    const command =
      scriptName === "scriptWithWarnings"
        ? `node --no-warnings -r esm -r @std/esm ${scriptName}`
        : `npm run ${scriptName}`;

    const childProcess = exec(
      command,
      { env: { ...process.env, FORCE_COLOR: "1" } },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({ stdout, stderr });
      },
    );

    // Forcing color output specifically for lint script
    if (scriptName === "lint") {
      childProcess.stdout.pipe(process.stdout);
      childProcess.stderr.pipe(process.stderr);
    } else {
      childProcess.stdout.on("data", (data) => console.log(data));
      childProcess.stderr.on("data", (data) => {
        // Filter out specific warning messages
        if (
          !data.includes("ExperimentalWarning: Import assertions") &&
          !data.includes("ExperimentalWarning: Importing JSON modules")
        ) {
          console.error(data);
        }
      });
    }
  });
};

const runAllScripts = async () => {
  for (const script of config.SCRIPTS) {
    try {
      const { stdout, stderr } = await runScript(script);
      if (stdout && script !== "lint") {
        console.log(stdout);
      }
      if (stderr && script !== "lint") {
        console.error(stderr);
      }
    } catch (error) {
      console.error(`Failed to run script "${script}": ${error}`);
      break; // Stop execution if any script fails
    }
  }
};

runAllScripts();
