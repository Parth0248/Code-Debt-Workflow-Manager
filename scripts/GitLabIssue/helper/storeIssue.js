import fs from "fs";
import path from "path";

import { GITLAB_ISSUE_PATH } from "../utils/filePath.js";

const storeIssue = (issue) => {
  const __dirname = path.resolve();

  fs.writeFileSync(
    path.resolve(__dirname, GITLAB_ISSUE_PATH),
    JSON.stringify(issue, null, 2),
  );
};

export default storeIssue;
