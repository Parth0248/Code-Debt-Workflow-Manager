import { forEach } from "async";
import { TAG_REGEX, COMMENT_REGEX } from "../syntax/getSyntax.js";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure TODO, FIXME, DP tags follow the specific format",
      recommended: false,
    },
    fixable: "code",  // for --fix functionality in eslint
    schema: [],
    messages: {
      incorrectlyFormatted:
        "Found an incorrectly formatted comment in line {{start}} : {{comment}}",
    },
  },
  create(context) {
    function validateComment(comment) {
      if (TAG_REGEX.test(comment.value)) {
        for (const type in COMMENT_REGEX) {
          const regexes = COMMENT_REGEX[type];
          let isValid = false;
          console.log('regexes:', regexes);
          forEach(regexes, (regex) => {
            if (!regex.test(comment.value)) {
              context.report({
                node: comment,
                messageId: "incorrectlyFormatted",
                data: {
                  comment: comment.value,
                  start: comment.loc.start.line,
                },
              });
            }
          });
        }
      }
    }

    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();

        comments.forEach((comment) => {
          if (comment.type === "Line" || comment.type === "Block") {
            validateComment(comment);
          }
        });
      },
    };
  },
};
