// Parent class for comment patterns
class CommentPattern {
  constructor(
    type,
    regex,
    multiLineRegex,
    multiLineStarRegex,
    lintRegex,
    lintMultiLineRegex,
    lintMultiLineStarRegex,
  ) {
    this.type = type;
    this.regex = regex;
    this.multiLineRegex = multiLineRegex;
    this.multiLineStarRegex = multiLineStarRegex;
    this.lintRegex = lintRegex;
    this.lintMultiLineRegex = lintMultiLineRegex;
    this.lintMultiLineStarRegex = lintMultiLineStarRegex;
  }
  getLintPatterns() {
    return {
      regex: this.lintRegex,
      multiLineRegex: this.lintMultiLineRegex,
      multiLineStarRegex: this.lintMultiLineStarRegex,
    };
  }
  getParserPatterns() {
    return {
      regex: this.regex,
      multiLineRegex: this.multiLineRegex,
      multiLineStarRegex: this.multiLineStarRegex,
    };
  }
}

export default CommentPattern;
