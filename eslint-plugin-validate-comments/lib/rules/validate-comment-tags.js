import { TAG_REGEX, COMMENT_REGEX } from "../syntax/getSyntax.js";

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure TODO, FIXME, DP tags follow the specific format",
      recommended: false,
    },
    schema: [],
    messages: {
      incorrectlyFormatted:
        "Incorrectly Formatted comment in {{line}}:\n {{comment}}",
    },
  },
  create(context) {
    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();
        comments.map((comment) => {
          if (comment.type === "Line" || comment.type === "Block") {
            const commentValue = comment.value;
            const match = TAG_REGEX.exec(commentValue);
            if (match) {
              const tag = match[0];
              const regexes = COMMENT_REGEX[tag];
              if (regexes) {
                const isMatch = Object.values(regexes).some((regex) =>
                  regex.test(commentValue),
                );

                if (!isMatch) {
                  context.report({
                    node: comment,
                    messageId: "incorrectlyFormatted",
                    data: {
                      comment: comment.value,
                      line: comment.loc.start.line,
                    },
                  });
                }
              }
            }
          }
        });
      },
    };
  },
};
