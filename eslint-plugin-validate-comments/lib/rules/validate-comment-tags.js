import {
  TAG_REGEX,
  COMMENT_REGEX,
  ERROR_MESSAGES,
} from "../syntax/getSyntax.js";

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure TODO, FIXME, DP tags follow the specific format",
      recommended: false,
    },
    schema: [],
    messages: {
      singleLineError: ERROR_MESSAGES.singleLineError,
      multiLineError: ERROR_MESSAGES.multiLineError,
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

                const errorMessageId =
                  comment.type === "Line"
                    ? "singleLineError"
                    : "multiLineError";

                if (!isMatch) {
                  context.report({
                    node: comment,
                    messageId: errorMessageId,
                    data: {
                      comment: comment.value,
                      line: comment.loc.start.line,
                      tag: tag,
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
