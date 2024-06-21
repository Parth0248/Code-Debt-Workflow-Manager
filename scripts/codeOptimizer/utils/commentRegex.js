// stores regex for all types of comments
import commentTypes from "./commentTypes.js";

const REGEX_MAP = {
  [commentTypes[0]]: {
    // We should not have array element as key of a map. Let us discuss this.
    // It should be commentTypes.todo instead
    regex:
      /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
    multiLineRegex:
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
    multiLineStarRegex:
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
  },
  [commentTypes[1]]: {
    regex:
      /\/\/\s*FIXME\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
    multiLineRegex:
      /\/\*\s*FIXME\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
    multiLineStarRegex:
      /\/\*\s*FIXME\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
  },
  [commentTypes[2]]: {
    regex:
      /\/\/\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
    multiLineRegex:
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
    multiLineStarRegex:
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
  },
};
export default REGEX_MAP;
