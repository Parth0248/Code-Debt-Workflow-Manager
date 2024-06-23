// return different alert text and color based on days remaining.
import thresholds from "./thresholds.js";

const alertText = (daysRemaining) => {
  const threshold = thresholds.find(
    (t) => daysRemaining >= t.min && daysRemaining <= t.max,
  );
  if (!threshold) {
    throw new Error("Invalid input: daysRemaining is out of expected range");
  }

  return {
    text: threshold.text(daysRemaining),
    color: threshold.color,
  };
};

export default alertText;
