// validate-comment-tags.js

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure TODO, FIXME, DP tags follow the specific format",
      category: "Best Practices",
      recommended: false
    },
    fixable: "code",
    schema: [],
    messages: {
      incorrectlyFormatted: "Found an incorrectly formatted comment in line {{start}} : {{comment}} "
    }
  },
  create(context) {
    const contains_tag = /(TODO|FIXME|DP)/;

    // const correct_syntax = /^[\s|*]+(TODO|FIXME|DP):\s*@[\w_]+\s*:\s*\d{2}-\d{2}-\d{4}\s*:\s*\d+\s*:\s*.+\s*:\s*.+/;
    // const correct_syntax = /^[\s|*]*?(TODO|FIXME|DP):\s*@[\w_]+\s*:\s*\d{2}-\d{2}-\d{4}\s*:\s*\d+\s*:\s*.+\s*:\s*[\s\S]*$/m;
    // const correct_syntax = /^\s*\*?\s*(TODO|FIXME|DP):\s*@[\w_]+\s*:\s*\d{2}-\d{2}-\d{4}\s*:\s*\d+\s*:\s*[\s\S]*?\s*:\s*[\s\S]+/m;
    // const correct_syntax = /^\s*\*?\s*(TODO|FIXME|DP):\s*@[\w_]+\s*:\s*\d{2}-\d{2}-\d{4}\s*:\s*\d+\s*:\s*([\s\S]+?)\s*$/m;
    const correct_syntax = /^\s*\*?\s*(TODO|FIXME|DP):\s*@[\w_]+\s*:\s*\d{2}-\d{2}-\d{4}\s*:\s*\d+\s*:\s*(.*?)\s*$/ms;

    function validateComment(comment) {
      // const match = comment.value.match(contains_tag);
      // console.log("match", match)
      // add another rule to ensure the comments with these tags always start in a new line, or after a block of code
      

      if (contains_tag.test(comment.value) && !correct_syntax.test(comment.value)) {
        context.report({
          node: comment,
          messageId: "incorrectlyFormatted",
          data: {
            comment: comment.value,
            start: comment.loc.start.line,
          }
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

//    const TODO_MAP = {
//    regex: /\/\/\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*)/g,
//   multiLineRegex: /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs,
//   multiLineStarRegex: /\/\*\s*TODO\s*:\s*@([a-zA-Z0-9_-]+)\s*:\s*\n\s*\*\s*(\d{2}-\d{2}-\d{4})\s*:\s*(\d+)\s*:\s*\n\s*\*\s*([^:]+)\s*:\s*(.*?)\s*\*\//gs
// };

// module.exports = {
//   meta: {
//     type: "problem",
//     docs: {
//       description: "Ensure TODO, FIXME, DP tags follow the specific format",
//       category: "Best Practices",
//       recommended: false
//     },
//     fixable: "code",
//     schema: [],
//     messages: {
//       incorrectlyFormatted: "Found an incorrectly formatted comment: {{comment}}"
//     }
//   },
//   create(context) {
//     const contains_tag = /(TODO|FIXME|DP)/;
//     const correct_syntax = /^[\s|*]+(TODO|FIXME|DP): @\w+: \d{2}-\d{2}-\d{4} : \d+ : .+ : .+/;

//     function validateComment(comment) {
//       if (contains_tag.test(comment.value) && !correct_syntax.test(comment.value)) {
//         context.report({
//           node: comment,
//           messageId: "incorrectlyFormatted",
//           data: {
//             comment: comment.value,
//           }
//         });
//       }
//     }

//     return {
//       Program() {
//         const comments = context.getSourceCode().getAllComments();
//         comments.forEach((comment) => {
//           if (comment.type === "Line" || comment.type === "Block") {
//             validateComment(comment);
//           }
//         });
//       }
//     };
//   }
// };
