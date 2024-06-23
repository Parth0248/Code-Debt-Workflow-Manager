import fs from "fs";

const getIssuesData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
};

export default getIssuesData;
