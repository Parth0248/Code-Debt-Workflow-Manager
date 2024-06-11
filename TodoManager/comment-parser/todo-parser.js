const fs = require('fs');
const { exec } = require('child_process');

const todoJsonFilePath = './todo.json';

// Check if todo.json file exists, if not, create it
if (!fs.existsSync(todoJsonFilePath)) {
  fs.writeFileSync(todoJsonFilePath, '[]', 'utf8');
}

// Execute Leasot command to generate todo.json
exec(`leasot -x -S --reporter json > ${todoJsonFilePath} ./src/`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});



// const fs = require('fs');
// const path = require('path');

// const TODO_PATTERN = /\/\/\s*TODO:\s*([a-zA-Z0-9_-]+):\s*(\d{4}-\d{2}-\d{2}):\s*(\d+):\s*(.*)/g;

// function parseTodos(directory) {
//   const todos = [];
  
//   function readFiles(dir) {
//     fs.readdirSync(dir).forEach(file => {
//       const fullPath = path.join(dir, file);
//       if (fs.lstatSync(fullPath).isDirectory()) {
//         readFiles(fullPath);
//       } else if (fullPath.endsWith('.js')) {
//         const content = fs.readFileSync(fullPath, 'utf8');
//         let match;
//         while ((match = TODO_PATTERN.exec(content)) !== null) {
//           todos.push({
//             username: match[1],
//             date: match[2],
//             days: match[3],
//             message: match[4],
//             file: fullPath,
//             line: content.substr(0, match.index).split('\n').length
//           });
//         }
//       }
//     });
//   }

//   readFiles(directory);
//   return todos;
// }

// function saveTodosToFile(todos, filePath) {
//   fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), 'utf8');
// }

// const todos = parseTodos('./src');
// saveTodosToFile(todos, 'todo.json');

// // Write a todo-parser.js that uses leasot to parse all files to identify todo comments that are starting with // TODO : just as mentioned in the official leasot website. 
// // https://www.npmjs.com/package/leasot?activeTab=readme
// // And todo-parser.js should also create a todo.json that contains information about the TODOs in each file, the line they were written in and other details stored in them.
// // TODO: alice_wang: 2024-07-15: 14: Refactor the data fetching logic to use async/await.
// // TODO: <username>: <priority>: <current_date>: <days>: <unique_title>: <optional_message>
