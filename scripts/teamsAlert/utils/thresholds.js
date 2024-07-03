import thresholdDays from "./thresholdDays.js";
const alertColor = {
  red: "attention",
  orange: "warning",
  green: "warning",
};

const pluralize = (count) => (count === 1 ? "day" : "days");

const thresholds = [
  {
    min: -Infinity,
    max: thresholdDays.critical,
    text: (days) =>
      `Critical! Task overdue by ${Math.abs(days)} ${pluralize(Math.abs(days))}. Immediate attention needed.`,
    color: alertColor.red,
  },
  {
    min: thresholdDays.critical,
    max: thresholdDays.overdue,
    text: (days) =>
      `You missed the deadline by ${Math.abs(days)} ${pluralize(Math.abs(days))}.`,
    color: alertColor.red,
  },
  {
    min: thresholdDays.finalDay,
    max: thresholdDays.finalDay,
    text: () => `Today's the day! Deadline is here.`,
    color: alertColor.red,
  },
  {
    min: thresholdDays.oneDay,
    max: thresholdDays.finalWeek,
    text: (days) =>
      `Final week! Just ${days} ${pluralize(days)} left to complete your task.`,
    color: alertColor.red,
  },
  {
    min: thresholdDays.finalWeek + 1,
    max: thresholdDays.finalTwoWeeks + 1,
    text: (days) =>
      `Time is ticking! Only ${days} ${pluralize(days)} left to finish your task.`,
    color: alertColor.green,
  },
  {
    min: thresholdDays.finalTwoWeeks + 2,
    max: thresholdDays.finalMonth,
    text: (days) =>
      `Halfway through the month. ${days} ${pluralize(days)} left to meet your deadline.`,
    color: alertColor.green,
  },
  {
    min: thresholdDays.finalMonth + 1,
    max: thresholdDays.finalTwoMonths,
    text: (days) =>
      `Plenty of time left. ${days} ${pluralize(days)} left to plan and finish your task.`,
    color: alertColor.green,
  },
];
export default thresholds;
  