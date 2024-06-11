const fs = require('fs');
const path = require('path');

const REACT_DIR = './react'; // Replace with the actual path to the cloned React repository
const MAX_TODOS_PER_FILE = 3; 
const USER_NAMES = ['cleverpanda42', 'happytiger17', 'bravetortoise8', 'sillymonkey99', 'kindpenguin3', 'happypanda77', 'cleverotter23', 'fiercemonkey67', 'kindpanda75'];
const MAX_DAYS = 60;

function getRandomDate() {
  const start = new Date(2024, 0, 1); 
  const end = new Date();             
  const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTimestamp);
  return randomDate.toLocaleDateString('en-GB'); // DD/MM/YYYY format
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTitle() {
  const nouns = ['bug', 'feature', 'refactor', 'optimization', 'test', 'cleanup', 'documentation'];
  const randomNoun = nouns[getRandomInt(0, nouns.length - 1)];
  return `${randomNoun.charAt(0).toUpperCase() + randomNoun.slice(1)} ${getRandomInt(1, 100)}`; // Capitalize the first letter
}

function generateRandomDescription() {
  const descriptions = [
    "Investigate potential performance improvements.",
    "Handle edge case where input is invalid.",
    "Add unit tests for this functionality.",
    "Update documentation to reflect changes.",
    "Consider using a more efficient algorithm.",
    "Refactor to improve code readability.",
    "Check for compatibility with older browsers.",
    "Implement error handling for network failures.",
    "Explore alternative solutions for this problem.",
    "Discuss with team for better approach.",
    "" // Add an empty string for cases where there's no description
  ];
  return descriptions[getRandomInt(0, descriptions.length - 1)];
}

function generateRandomTodo() {
  const format = getRandomInt(0, 2);
  const username = USER_NAMES[getRandomInt(0, USER_NAMES.length - 1)];
  let date = getRandomDate();
  // convert date to dd-mm--yyyy
  const dateParts = date.split('/');
  date = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;


  const days = getRandomInt(1, MAX_DAYS);
  const title = generateRandomTitle();
  const description = generateRandomDescription(); // Get a random description (could be empty)

  if (format === 0) {
    return `// TODO : @${username} : ${date} : ${days} : ${title} : ${description}`; 
  } else if (format === 1) {
    return `/* TODO : @${username} : ${date} : ${days} : ${title} : ${description} */`;
  } else {
    // For multiline starred comments, add the description on a new line if it's not empty
    const descriptionText = description ? `\n* ${description}\n` : '';
    return `/* TODO : @${username} : ${date} : ${days} : ${title} : ${descriptionText}*/`;
  }
}

function findFiles(dir) {
  return fs.readdirSync(dir).flatMap(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      return findFiles(fullPath);
    } else if (fullPath.match(/\.(js|mjs|ts|jsx|tsx|vue|coffee)$/)) {
      return fullPath;
    } else {
      return [];
    }
  });
}

function insertRandomTodos(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let todosInserted = 0;
  let lastTodoIndex = -1; 

  while (todosInserted < MAX_TODOS_PER_FILE) {
    const emptyLineIndices = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '' && i - lastTodoIndex > 2) { // Ensure some spacing
        emptyLineIndices.push(i);
      }
    }

    if (emptyLineIndices.length === 0) {
      break;
    }

    const randomIndex = emptyLineIndices[Math.floor(Math.random() * emptyLineIndices.length)];
    lines.splice(randomIndex, 0, generateRandomTodo());
    todosInserted++;
    lastTodoIndex = randomIndex;
  }

  const updatedContent = lines.join('\n');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

const filesToTransform = findFiles(REACT_DIR);

filesToTransform.forEach(file => {
  console.log(`Transforming ${file}...`);
  insertRandomTodos(file);
});


// function generateRandomUsername() {
//     const adjectives = ['clever', 'happy', 'brave', 'silly', 'kind', 'quick', 'dreamy', 'fierce'];
//     const nouns = ['panda', 'tiger', 'monkey', 'elephant', 'parrot', 'dolphin', 'otter', 'penguin'];
//     const numbers = Array.from({length: 100}, (_, i) => i + 1); // Numbers 1 to 100
  
//     const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//     const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
//     const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
//     return `${randomAdjective}${randomNoun}${randomNumber}`;
//   }
  
//   const usernames = [];
//   for (let i = 0; i < 50; i++) {
//     usernames.push(generateRandomUsername());
//   }
  
//   const formattedUsernames = `'${usernames.join("', '")}'`;
//   console.log(formattedUsernames);