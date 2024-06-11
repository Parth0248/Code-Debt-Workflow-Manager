const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const crypto = require("crypto");

const todoJsonFilePath = "./todo.json";

// Check if todo.json file exists, if not, create it
if (!fs.existsSync(todoJsonFilePath)) {
  fs.writeFileSync(todoJsonFilePath, "[]", "utf8");
}

// Start timer for benchmarking
const startTime = process.hrtime();

// Execute Leasot command for single-line and standard multi-line TODOs
exec(
  `leasot -x -S --reporter json > ${todoJsonFilePath} ./react/`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }

    // Read parsed TODOs from todo.json
    let todos = JSON.parse(fs.readFileSync(todoJsonFilePath, "utf8"));

    // Regex pattern for multi-line starred comments (with space handling and correct date format DD-MM-YYYY)
    const multiLineStarredTodoPattern = /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs;

    // Function to generate a unique ID for each comment
    function generateUniqueId(content, filePath, username, date) {
      const hash = crypto.createHash("sha256");
      hash.update(content + filePath + username + date);
      return hash.digest("hex");
    }

    // Function to parse TODOs from Leasot's output and multi-line starred comments
    function parseTodos(todos) {
      const parsedTodos = [];

      // Regex to split Leasot's single-line TODO text into its components (with correct date format DD-MM-YYYY)
      const singleLineTodoRegex = /@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/;

      todos.forEach((todo) => {
        const fileContent = fs.readFileSync(todo.file, "utf8");
        let match;

        // Check for multiline starred comments
        match = multiLineStarredTodoPattern.exec(fileContent);
        if (match) {
          const id = generateUniqueId(match[0], todo.file, match[1], match[2]);
          parsedTodos.push({
            id: id,
            type: "todo",
            username: match[1],
            date: match[2],
            days: match[3],
            title: match[4].trim(),
            message: match[5].trim().replace(/^\s*\*/, ""),
            file: todo.file,
            line: todo.line,
          });
        } else {
          // Check for single line TODOs
          match = singleLineTodoRegex.exec(todo.text);
          if (match) {
            const id = generateUniqueId(todo.text, todo.file, match[1], match[2]);
            parsedTodos.push({
              id: id,
              type: "todo",
              username: match[1],
              date: match[2],
              days: match[3],
              title: match[4].trim(),
              message: match[5].trim(),
              file: todo.file,
              line: todo.line,
            });
          }
        }
      });

      return parsedTodos;
    }

    // Parse TODOs and overwrite todo.json
    const parsedTodos = parseTodos(todos);
    fs.writeFileSync(
      todoJsonFilePath,
      JSON.stringify(parsedTodos, null, 2),
      "utf8"
    );

    // Stop timer and calculate elapsed time
    const elapsedTime = process.hrtime(startTime);
    const totalTimeInSeconds = (elapsedTime[0] + elapsedTime[1] / 1e9).toFixed(
      3
    );
    console.log(`Total execution time: ${totalTimeInSeconds} seconds`);

    const jsonFilePath = "./todo.json";

    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
        return;
      }

      const todos = JSON.parse(data);
      console.log(`Total TODOs found: ${todos.length}`);
      // console.log(JSON.stringify(todos, null, 2));
    }
    );
  }
);



// const fs = require("fs");
// const { exec } = require("child_process");
// const path = require("path");
// const crypto = require("crypto");

// const todoJsonFilePath = "./todo.json";

// // Check if todo.json file exists, if not, create it
// if (!fs.existsSync(todoJsonFilePath)) {
//   fs.writeFileSync(todoJsonFilePath, "[]", "utf8");
// }

// // Start timer for benchmarking
// const startTime = process.hrtime();

// // Execute Leasot command for single-line and standard multi-line TODOs
// exec(
//   `leasot -x -S --reporter json > ${todoJsonFilePath} ./test/`,
//   (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`Stderr: ${stderr}`);
//       return;
//     }

//     // Read parsed TODOs from todo.json
//     let todos = JSON.parse(fs.readFileSync(todoJsonFilePath, "utf8"));

//     // Regex pattern for multi-line starred comments (with space handling and correct date format DD-MM-YYYY)
//     const multiLineStarredTodoPattern =
//       /\/\*\*?\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*((?:\s*\*\s*(?!\/\*\*).*)*?)\*\//gs;

//     // Function to generate a unique ID for each comment
//     function generateUniqueId(content, filePath, username, date) {
//       const hash = crypto.createHash("sha256");
//       hash.update(content + filePath + username + date);
//       return hash.digest("hex");
//     }

//     // Function to parse TODOs from Leasot's output and multi-line starred comments
//     function parseTodos(todos) {
//       const parsedTodos = [];

//       // Regex to split Leasot's single-line TODO text into its components (with correct date format DD-MM-YYYY)
//       const singleLineTodoRegex =
//         /@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*(.*)/;

//       todos.forEach((todo) => {
//         const fileContent = fs.readFileSync(todo.file, "utf8");
//         let match;

//         // Check for multiline starred comments
//         match = multiLineStarredTodoPattern.exec(fileContent);
//         if (match) {
//           const id = generateUniqueId(match[0], todo.file, match[1], match[2]);
//           parsedTodos.push({
//             id: id,
//             type: "todo",
//             username: match[1],
//             date: match[2],
//             days: match[3],
//             title: match[4].trim(),
//             message: match[5].trim().replace(/^\s*\*/, ""),
//             file: todo.file,
//             line: todo.line,
//           });
//         } else {
//           //check for single line TODOs
//           match = singleLineTodoRegex.exec(todo.text);
//           if (match) {
//             const id = generateUniqueId(
//               todo.text,
//               todo.file,
//               match[1],
//               match[2]
//             );
//             parsedTodos.push({
//               id: id,
//               type: "todo",
//               username: match[1],
//               date: match[2],
//               days: match[3],
//               title: match[4].trim().split(":")[0], // Extract title before the first colon
//               message: match[4].trim().split(":").slice(1).join(":").trim(), // Extract message after the first colon
//               file: todo.file,
//               line: todo.line,
//             });
//           }
//         }
//       });

//       return parsedTodos;
//     }

//     // Parse TODOs and overwrite todo.json
//     const parsedTodos = parseTodos(todos);
//     fs.writeFileSync(
//       todoJsonFilePath,
//       JSON.stringify(parsedTodos, null, 2),
//       "utf8"
//     );

//     // Stop timer and calculate elapsed time
//     const elapsedTime = process.hrtime(startTime);
//     const totalTimeInSeconds = (elapsedTime[0] + elapsedTime[1] / 1e9).toFixed(
//       3
//     );
//     console.log(`Total execution time: ${totalTimeInSeconds} seconds`);
//   }
// );
