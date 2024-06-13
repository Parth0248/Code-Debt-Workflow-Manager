const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Define check classes
class TodoCheck {
  constructor() {
    this.regex =
      /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g;
    this.multiLineRegex =
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
    this.multiLineStarRegex =
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
  }

  getSyntax() {
    return "TODO : @<username> : <DD/MM/YYYY> : <days> : <unique_title> : <optional_description>";
  }

  validate(comment) {
    let match = this.regex.exec(comment);
    if (!match) {
      match = this.multiLineRegex.exec(comment);
    }
    if (!match) {
      match = this.multiLineStarRegex.exec(comment);
    }
    if (match) {
      return {
        type: "TODO",
        username: match[1],
        date: match[2],
        days: match[3],
        title: match[4],
        message: match[5],
      };
    }
    return null;
  }
}

class DpCheck {
  constructor() {
    this.regex =
      /\/\/\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*)/g;
    this.multiLineRegex =
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*?)\*\//gs;
    this.multiLineStarRegex =
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([\w\s]+)\s*:\s*(.*?)\s*\*\//gs;
  }

  getSyntax() {
    return "DP : @<username> : <DD/MM/YYYY> : <days> : <unique_title> : <optional_description>";
  }

  validate(comment) {
    let match = this.regex.exec(comment);
    if (!match) {
      match = this.multiLineRegex.exec(comment);
    }
    if (!match) {
      match = this.multiLineStarRegex.exec(comment);
    }
    if (match) {
      return {
        type: "DP",
        username: match[1],
        date: match[2],
        days: match[3],
        title: match[4],
        message: match[5],
      };
    }
    return null;
  }
}

const checkMap = {
  todo: new TodoCheck(),
  // dp: new DpCheck()
};

// Function to generate a unique ID for each comment
function generateUniqueId(content, filePath, username, date) {
  const hash = crypto.createHash("sha256");
  hash.update(content + filePath + username + date);
  return hash.digest("hex");
}
// function readFiles(dir) {
//   fs.readdirSync(dir).forEach((file) => {
//     const fullPath = path.join(dir, file);
//     if (fs.lstatSync(fullPath).isDirectory()) {
//       readFiles(fullPath);
//     } else if (fullPath.match(/\.(js|mjs|ts|jsx|tsx|vue|coffee)$/)) {
//       const unfiltered_content = fs.readFileSync(fullPath, "utf8");

//       // Scalable Comment Extraction
//       const filteredContent = extractCommentsWithTags(unfiltered_content);

//       // Process filtered content with check classes (TODO, DP, etc.)
//       for (const checkType in checkMap) {
//         const check = checkMap[checkType];

//         let match;
//         while (
//           (match = check.regex.exec(filteredContent)) !== null ||
//           (match = check.multiLineRegex.exec(filteredContent)) !== null ||
//           (match = check.multiLineStarRegex.exec(filteredContent)) !== null
//         ) {
//           const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
//           comments.push({
//             // ... (rest of your comment data)
//           });
//         }
//       }
//     }
//   });
// }

function extractCommentsWithTags(content) {
  const commentRegex = /(\/\*[\s\S]*?\*\/|\/\/.*)/g; // Match both single and multi-line comments
  const tagRegex = /@([a-zA-Z0-9_-]+)\s*:/; // Match tag within a comment

  return (
    content
      .match(commentRegex)
      ?.filter((comment) => comment.match(tagRegex)) // Filter comments with tags
      .join("\n") || ""
  ); // Join the remaining comments or return empty string if none
}

// Function to parse comments from files in the given directory
function parseComments(directory) {
  const comments = [];

  function readFiles(dir) {

    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        readFiles(fullPath);
      } else if (fullPath.match(/\.(js|mjs|ts|jsx|tsx|vue|coffee)$/)) {
        const unfiltered_content = fs.readFileSync(fullPath, "utf8"); // Comment : Modularize this code and Read files Asyncronously

        // Scalable Comment Extraction to avoid parsing the entire file
        const filteredContent = extractCommentsWithTags(unfiltered_content); 
        

        const content = filteredContent;
        // console.log(content);

        // console.log(`Parsing file: ${fullPath}`);
        for (const checkType in checkMap) {
          const check = checkMap[checkType];
          let match;
          while (
            (match = check.regex.exec(content)) !== null ||
            (match = check.multiLineRegex.exec(content)) !== null ||
            (match = check.multiLineStarRegex.exec(content)) !== null
          ) {
            // console.log(`Match found: ${match[0]}`);
            const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
            const [day, month, year] = match[2].split("-"); // Assuming DD-MM-YYYY format
            const dateObj = new Date(`${year}-${month}-${day}`);
            const epochDate = dateObj.getTime(); // Epoch time in milliseconds
            
            // Get current timestamp in epoch format
            const currentDate = new Date().getTime();

            comments.push({
              id: id,
              type: checkType,
              username: match[1],
              date: epochDate,
              days: match[3],
              title: match[4],
              message: match[5],
              file: fullPath,
              line: content.substr(0, match.index).split("\n").length,
              created_at: currentDate, // Add the created_at field
            });
          }
        }
      }
    });
  }

  readFiles(directory);
  return comments;
}

// Function to handle file creation and saving logic
function handleFileSaving(comments, oldFilePath, newFilePath) {
  if (!fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
    saveCommentsToFile(comments, oldFilePath);
  } else if (fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
    saveCommentsToFile(comments, newFilePath);
  } else {
    const oldContent = fs.readFileSync(newFilePath, "utf8");
    fs.writeFileSync(oldFilePath, oldContent, "utf8");
    saveCommentsToFile(comments, newFilePath);
  }
}

// Function to save parsed comments to a JSON file
function saveCommentsToFile(comments, filePath) {
  // console.log(comments);
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), "utf8");
}

// Parse comments and handle file saving logic
const comments = parseComments("./src"); // Comment : take path from root directory 
handleFileSaving(comments, "todo_old.json", "todo_new.json");

///////////////////////////////////////////////////////////////////////////////////////

// const fs = require("fs");
// const path = require("path");
// const crypto = require("crypto");

// // Define regex patterns for TODO comments in various formats
// const SINGLE_LINE_TODO_PATTERN =
// /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g;
//   const MULTI_LINE_TODO_PATTERN =
//   /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
//   const MULTI_LINE_STARRED_TODO_PATTERN =
//   /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;

// // Function to generate a unique ID for each TODO comment
// function generateUniqueId(content, filePath, username, date) {
//   const hash = crypto.createHash("sha256");
//   hash.update(content + filePath + username + date);
//   return hash.digest("hex");
// }

// // Function to parse TODO comments from files in the given directory
// function parseTodos(directory) {
//   const todos = [];

//   function readFiles(dir) {
//     fs.readdirSync(dir).forEach((file) => {
//       const fullPath = path.join(dir, file);
//       if (fs.lstatSync(fullPath).isDirectory()) {
//         readFiles(fullPath);
//       } else if (fullPath.match(/\.(js|mjs|ts|jsx|tsx|vue|coffee)$/)) {
//         const content = fs.readFileSync(fullPath, "utf8");

//         // Single-line comments
//         let match;
//         while ((match = SINGLE_LINE_TODO_PATTERN.exec(content)) !== null) {
//           const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
//           todos.push({
//             id: id,
//             username: match[1],
//             date: match[2],
//             days: match[3],
//             title: match[4],
//             file: fullPath,
//             line: content.substr(0, match.index).split("\n").length,
//           });
//         }

//         // Multi-line comments
//         while ((match = MULTI_LINE_TODO_PATTERN.exec(content)) !== null) {
//           const id = generateUniqueId(match[0], fullPath, match[1], match[2]);

//           // Remove leading asterisks, newlines, and trim
//           let title = match[4]
//             .split("\n")
//             .map((line) => line.trim().replace(/^\s*\*/, "")) // Remove leading asterisks
//             .filter((line) => line.trim() !== "") // Remove empty lines
//             .join(" "); // Join with spaces

//           todos.push({
//             id: id,
//             username: match[1],
//             date: match[2],
//             days: match[3],
//             title: title, // Use the updated title here
//             file: fullPath,
//             line: content.substr(0, match.index).split("\n").length,
//           });
//         }

//         // Multi-line starred comments (UPDATED)
//         while (
//           (match = MULTI_LINE_STARRED_TODO_PATTERN.exec(content)) !== null
//         ) {
//           const id = generateUniqueId(match[0], fullPath, match[1], match[2]);

//           // Remove leading asterisks, newlines, and trim (UPDATED)
//           let title = match[4]
//             .split("\n")
//             .map((line) => line.trim().replace(/^\s*\*/, "")) // Remove leading asterisks
//             .filter((line) => line.trim() !== "") // Remove empty lines
//             .join(" "); // Join with spaces

//           todos.push({
//             id: id,
//             username: match[1],
//             date: match[2],
//             days: match[3],
//             title: title, // Use the updated title here
//             file: fullPath,
//             line: content.substr(0, match.index).split("\n").length,
//           });
//         }
//       }
//     });
//   }

//   readFiles(directory);
//   return todos;
// }

// // Function to save parsed TODOs to a JSON file
// function saveTodosToFile(todos, filePath) {
//   fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf8");
// }

// // Parse TODOs and save them to todo.json
// const todos = parseTodos("./src");
// saveTodosToFile(todos, "todo.json");
