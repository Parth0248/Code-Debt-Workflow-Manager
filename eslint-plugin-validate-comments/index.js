import validateCommentTags from "./lib/rules/validate-comment-tags.js";

export const commentPlugin = {
  rules: { "validate-comment": validateCommentTags },
};
