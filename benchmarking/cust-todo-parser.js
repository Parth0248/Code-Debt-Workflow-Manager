const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Define check classes
class TodoCheck {
  constructor() {
    this.regex = /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g;
    this.multiLineRegex = /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
    this.multiLineStarRegex = /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
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
        type: 'TODO',
        username: match[1],
        date: match[2],
        days: match[3],
        title: match[4],
        message: match[5]
      };
    }
    return null;
  }
}

class DpCheck {
  constructor() {
    this.regex = /\/\/\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*)/g;
    this.multiLineRegex = /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*?)\*\//gs;
    this.multiLineStarRegex = /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([\w\s]+)\s*:\s*(.*?)\s*\*\//gs;
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
        type: 'DP',
        username: match[1],
        date: match[2],
        days: match[3],
        title: match[4],
        message: match[5]
      };
    }
    return null;
  }
}

const checkMap = {
  todo: new TodoCheck(),
  dp: new DpCheck()
};

// Function to generate a unique ID for each comment
function generateUniqueId(content, filePath, username, date) {
  const hash = crypto.createHash('sha256');
  hash.update(content + filePath + username + date);
  return hash.digest('hex');
}

// Function to parse comments from files in the given directory
function parseComments(directory) {
  // Start benchmarking timer
  const startTime = process.hrtime();

  const comments = [];

  function readFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        readFiles(fullPath);
      } else if (fullPath.match(/\.(js|mjs|ts|jsx|tsx|vue|coffee)$/)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // filtered content that only contains comments to prevent multiple parsing of whole file using basic regex

        // console.log(`Parsing file: ${fullPath}`);
        for (const checkType in checkMap) {
          const check = checkMap[checkType];
          let match;
          while ((match = check.regex.exec(content)) !== null ||
                 (match = check.multiLineRegex.exec(content)) !== null ||
                 (match = check.multiLineStarRegex.exec(content)) !== null) {
            // console.log(`Match found: ${match[0]}`);
            const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
            
            comments.push({
              id: id,
              type: checkType,
              username: match[1],
              date: match[2],
              days: match[3],
              title: match[4],
              message: match[5],
              file: fullPath,
              line: content.substr(0, match.index).split('\n').length
            });
          }
        }
      }
    });
  }

  readFiles(directory);

  // Stop timer and calculate elapsed time
  const elapsedTime = process.hrtime(startTime);
  const totalTimeInSeconds = (elapsedTime[0] + elapsedTime[1] / 1e9).toFixed(3);

  console.log(`Total parsing time: ${totalTimeInSeconds} seconds`); 

  return comments;
}

// Function to handle file creation and saving logic
function handleFileSaving(comments, oldFilePath, newFilePath) {
  if (!fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
    saveCommentsToFile(comments, oldFilePath);
  } else if (fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
    saveCommentsToFile(comments, newFilePath);
  } else {
    const oldContent = fs.readFileSync(newFilePath, 'utf8');
    fs.writeFileSync(oldFilePath, oldContent, 'utf8');
    saveCommentsToFile(comments, newFilePath);
  }
}

// Function to save parsed comments to a JSON file
function saveCommentsToFile(comments, filePath) {
  // console.log(comments);
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf8');
}

// Start the overall benchmarking timer
const overallStartTime = process.hrtime();

// Parse comments and handle file saving logic
const comments = parseComments('./react/');
handleFileSaving(comments, 'todo_old.json', 'todo_new.json');

// Stop the overall timer and calculate elapsed time
const overallElapsedTime = process.hrtime(overallStartTime);
const overallTimeInSeconds = (overallElapsedTime[0] + overallElapsedTime[1] / 1e9).toFixed(3);

console.log(`Overall execution time (including file saving): ${overallTimeInSeconds} seconds`);

const jsonFilePath = "./todo_old.json";

    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        return;
      }

      const todos = JSON.parse(data);
      console.log(`Total TODOs found: ${todos.length}`);
    }
    );



///////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');

// // Define check classes
// class TodoCheck {
//   constructor() {
//     this.regex = /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g;
//     this.multiLineRegex = /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
//     this.multiLineStarRegex = /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;
//   }

//   getSyntax() {
//     return "TODO : @<username> : <DD/MM/YYYY> : <days> : <unique_title> : <optional_description>";
//   }

//   validate(comment) {
//     let match = this.regex.exec(comment);
//     if (!match) {
//       match = this.multiLineRegex.exec(comment);
//     }
//     if (!match) {
//       match = this.multiLineStarRegex.exec(comment);
//     }
//     if (match) {
//       return {
//         type: 'TODO',
//         username: match[1],
//         date: match[2],
//         days: match[3],
//         title: match[4],
//         message: match[5]
//       };
//     }
//     return null;
//   }
// }

// class DpCheck {
//   constructor() {
//     this.regex = /\/\/\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*)/g;
//     this.multiLineRegex = /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*([\w\s]+)\s*:\s*(.*?)\*\//gs;
//     this.multiLineStarRegex = /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}\/\d{2}\/\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([\w\s]+)\s*:\s*(.*?)\s*\*\//gs;
//   }

//   getSyntax() {
//     return "DP : @<username> : <DD/MM/YYYY> : <days> : <unique_title> : <optional_description>";
//   }

//   validate(comment) {
//     let match = this.regex.exec(comment);
//     if (!match) {
//       match = this.multiLineRegex.exec(comment);
//     }
//     if (!match) {
//       match = this.multiLineStarRegex.exec(comment);
//     }
//     if (match) {
//       return {
//         type: 'DP',
//         username: match[1],
//         date: match[2],
//         days: match[3],
//         title: match[4],
//         message: match[5]
//       };
//     }
//     return null;
//   }
// }

// const checkMap = {
//   todo: new TodoCheck(),
//   // dp: new DpCheck()
// };

// // Function to generate a unique ID for each comment
// function generateUniqueId(content, filePath, username, date) {
//   const hash = crypto.createHash('sha256');
//   hash.update(content + filePath + username + date);
//   return hash.digest('hex');
// }

// // Function to parse comments from files in the given directory
// function parseComments(directory) {
//   const comments = [];

//   function readFiles(dir) {
//     fs.readdirSync(dir).forEach(file => {
//       const fullPath = path.join(dir, file);
//       if (fs.lstatSync(fullPath).isDirectory()) {
//         readFiles(fullPath);
//       } else if (fullPath.match(/\.(js|ts|jsx|vue)$/)) {
//         const content = fs.readFileSync(fullPath, 'utf8');
//         // console.log(`Parsing file: ${fullPath}`);
//         for (const checkType in checkMap) {
//           const check = checkMap[checkType];
//           let match;
//           while ((match = check.regex.exec(content)) !== null ||
//                  (match = check.multiLineRegex.exec(content)) !== null ||
//                  (match = check.multiLineStarRegex.exec(content)) !== null) {
//             // console.log(`Match found: ${match[0]}`);
//             const id = generateUniqueId(match[0], fullPath, match[1], match[2]);
//             comments.push({
//               id: id,
//               type: checkType,
//               username: match[1],
//               date: match[2],
//               days: match[3],
//               title: match[4],
//               message: match[5],
//               file: fullPath,
//               line: content.substr(0, match.index).split('\n').length
//             });
//           }
//         }
//       }
//     });
//   }

//   readFiles(directory);
//   return comments;
// }

// // Function to handle file creation and saving logic
// function handleFileSaving(comments, oldFilePath, newFilePath) {
//   if (!fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
//     saveCommentsToFile(comments, oldFilePath);
//   } else if (fs.existsSync(oldFilePath) && !fs.existsSync(newFilePath)) {
//     saveCommentsToFile(comments, newFilePath);
//   } else {
//     const oldContent = fs.readFileSync(newFilePath, 'utf8');
//     fs.writeFileSync(oldFilePath, oldContent, 'utf8');
//     saveCommentsToFile(comments, newFilePath);
//   }
// }

// // Function to save parsed comments to a JSON file
// function saveCommentsToFile(comments, filePath) {
//   // console.log(comments);
//   fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf8');
// }

// // Parse comments and handle file saving logic
// const comments = parseComments('./test/');
// handleFileSaving(comments, 'todo_old.json', 'todo_new.json');
