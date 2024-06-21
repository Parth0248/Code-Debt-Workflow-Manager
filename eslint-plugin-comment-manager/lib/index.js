// define the rule 'validate-comment-tags' in the settings object of the .eslintrc.cjs file
//

module.exports = {
  rules: {
    "validate-comment-tags": require("./rules/validate-comment-tags.js"),
  },
};

// /**
//  * @fileoverview Lint Rules for comments with Tags
//  * @author Parth Maradia
//  */
// "use strict";

// //------------------------------------------------------------------------------
// // Requirements
// //------------------------------------------------------------------------------

// const requireIndex = require("requireindex");

// //------------------------------------------------------------------------------
// // Plugin Definition
// //------------------------------------------------------------------------------

// // import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");
