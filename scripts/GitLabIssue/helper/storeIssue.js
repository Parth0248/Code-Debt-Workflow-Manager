import fs from "fs";
import path from "path";

import { ISSUES_FILE_PATH } from "../utils/filePath.js";

const storeIssue = (issue) => {
  const __dirname = path.resolve();

  fs.writeFileSync(
    path.resolve(__dirname, ISSUES_FILE_PATH),
    JSON.stringify(issue, null, 2),
  );
};

export default storeIssue;
