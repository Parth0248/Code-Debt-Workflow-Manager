import { program } from "commander";

const parseCommandLineArgs = (configArguments) => {
  program
    .option("-o, --output <path>", "Output directory")
    .option("-s, --src <path>", "Source code directory")
    .option("-f, --filetype <type>", "File types")
    .option("-t, --tasktype <type>", "Task types")
    .option("-i, --ignoredir <dir>", "Ignore directories")
    .parse(configArguments);

  return {
    outputDir: program.opts().output,
    srcDir: program.opts().src,
    fileTypes: program.opts().filetype
      ? program
          .opts()
          .filetype.split(",")
          .map((type) => type.trim())
      : undefined,
    taskTypes: program.opts().tasktype
      ? program
          .opts()
          .tasktype.split(",")
          .map((type) => type.trim())
      : undefined,
    ignoreDirs: program.opts().ignoredir
      ? program
          .opts()
          .ignoredir.split(",")
          .map((dir) => dir.trim())
      : undefined,
  };
};

export default parseCommandLineArgs;
