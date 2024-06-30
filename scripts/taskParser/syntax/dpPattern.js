import CommentPattern from "./commentPattern.js";

class DpPattern extends CommentPattern {
  constructor() {
    super(
      "DP",
      /\/\/\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*([^:]+)\s*:\s*(.*)/g,
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//g,
      /\/\*\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
      /\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*([^:]+)\s*:\s*(.*)/g,
      /\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//g,
      /\s*DP\s*:\s*@([a-zA-Z0-9_.-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*([0-9]+[WMD])\s*:\s*(perm|temp)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
    );
  }
}

export default DpPattern;
