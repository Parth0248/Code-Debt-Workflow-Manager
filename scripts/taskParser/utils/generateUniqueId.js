import crypto from "crypto";

// Function to generate a unique ID for each comment
const generateUniqueId = (content, filePath, username, date) => {
  const hash = crypto.createHash("sha256");
  hash.update(content + filePath + username + date);
  return hash.digest("hex");
};

export { generateUniqueId };
