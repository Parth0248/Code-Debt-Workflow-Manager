import CommentPattern from "./commentPattern.js";

class TodoPattern extends CommentPattern {
  constructor() {
    super(
      "TODO",
      /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:\n]+?)(?:\s*:\s*(.*))?$/gm,
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:\n]+)\s*(?:\n\s*(.*?)\s*)?\*\//gs,
      /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*([^:]+)\s*:\s*\n?\s*\*\s*(.*?)\s*\*\//gs,
      /\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:\n]+?)(?:\s*:\s*(.*))?$/gm,
      /\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:\n]+)\s*(?:\n\s*(.*?)\s*)?\*/gs,
      /\s*TODO\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*\n?\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:\s*\n?\s*\*\s*([^:]+)\s*:\s*\n?\s*\*\s*(.*?)\s*$/gs
    );
  }
}

export default TodoPattern;
