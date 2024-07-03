const generateIssueLabel = (issue) => {
  const issueLabel = [];
  if (issue.days <= 7 && issue.days >= 0) issueLabel.push("CRITICAL");
  if (issue.days < 0) issueLabel.push("EXPIRED");
  issueLabel.push(issue.type.toUpperCase());
  return issueLabel;
};

export default generateIssueLabel;
