// eslint-rules/validate-comment-tags.js

module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Ensure TODO, FIXME, DP tags follow the specific format",
        category: "Best Practices",
        recommended: false
      },
      fixable: "code",
      schema: [] // no options
    },
    create(context) {
      const contains_tag = /(TODO|FIXME|DP)/;
      const correct_syntax = /^[\s|*]+(TODO|FIXME|DP): @\w+: \d{2}-\d{2}-\d{4} : \d+ : .+ : .+/;
  
      function validateComment(comment) {
        if (contains_tag.test(comment.value) && !correct_syntax.test(comment.value)) {
          context.report({
            node: comment,
            message: `Found an incorrectly formatted TODO ${comment.value}`
          });
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
        }
      };
    }
  };
  