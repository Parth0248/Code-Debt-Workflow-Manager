// Return the first tag before : from the comments
//
// @param {string} comment - The comment to be checked
// @returns {string} - The tag in the comment

export default function getCommentType(comment) {
    const tagRegex = /([a-zA-Z0-9_-]+)\s*:/;
    const match = comment.match(tagRegex);
    
    return match ? match[1] : "No Tag";
}