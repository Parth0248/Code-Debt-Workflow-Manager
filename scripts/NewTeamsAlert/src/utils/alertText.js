// return different alert text and color based on days remaining.

export const alertText = (daysRemaining) => {
  if (daysRemaining === 0) {
    return {
      text: "Today's the day! Deadline is here.",
      color: "attention", // "attention","warning","good" etc should not be labeled as color. We can label them as 'type' and store an object to map type and color
    };
  } else if (daysRemaining > 0 && daysRemaining <= 7) {
    const PrintDay = daysRemaining === "1" ? "day" : "days";
    return {
      text: `Final week! Just ${daysRemaining} ${PrintDay} left to complete your task.`,
      color: "warning",
    };
  } else if (daysRemaining > 7 && daysRemaining <= 15) {
    return {
      text: `Time is Ticking! Only ${daysRemaining} days left to finish your task.`,
      color: "good",
    };
  } else if (daysRemaining > 15 && daysRemaining <= 30) {
    return {
      text: `Halfway through the month. ${daysRemaining} days left to meet your deadline.`,
      color: "good",
    };
  } else if (daysRemaining > 30 && daysRemaining <= 40) {
    return {
      text: `Plenty of time left. ${daysRemaining} days left to plan and finish your task.`,
      color: "good",
    };
  } else if (daysRemaining < 0 && daysRemaining >= -7) {
    return {
      text: `You missed the deadline by ${Math.abs(daysRemaining)} days.`,
      color: "attention",
    };
  } else if (daysRemaining < -7) {
    return {
      text: `Critical! Task overdue by ${Math.abs(
        daysRemaining
      )} days. Immediate attention needed.`,
      color: "attention",
    };
  }
};

export default alertText;
