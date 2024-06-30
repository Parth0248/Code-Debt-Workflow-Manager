import CommentPattern from "./commentPattern.js";

class FixmePattern extends CommentPattern {
  constructor() {
    super(
      "FIXME",
      /\/\/\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
      /\/\*\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)\s*\*\//gs,
      /\/\*\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*([^:]+)\s*:\s*\n?\s*\*\s*(.*?)\s*\*\//gs,
      /\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
      /\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)\s* /gs,
      /\s*FIXME\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*(?:(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+)\s*:)?\s*\n?\s*\*\s*([^:]+)\s*:\s*\n?\s*\*\s*(.*?)\s*\*\//gs,
    );
  }
}

export default FixmePattern;
