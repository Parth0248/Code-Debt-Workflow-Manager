// Extracts the required features from comments based on their tags type
//
// @param {Array} comments - The comments to be extracted
// @returns {Array} - The extracted features
//
// List of Features:
//               id: id,
//               type: tag,
//               username: match[1],
//               date: epochDate,
//               days: match[3],
//               title: match[4],
//               message: match[5],
//               file: fullPath,
//               line: content.substr(0, match.index).split("\n").length,
//               created_at: currentDate, // Add the created_at field

