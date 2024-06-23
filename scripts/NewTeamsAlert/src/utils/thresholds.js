const alertColor = {
  red: "attention",
  orange: "warning",
  green: "good",
};

const pluralize = (count) => (count === 1 ? "day" : "days");

const thresholds = [
  {
    min: -Infinity,
    max: -7,
    text: (days) =>
      `Critical! Task overdue by ${Math.abs(days)} ${pluralize(Math.abs(days))}. Immediate attention needed.`,
    color: alertColor.red,
  },
  {
    min: -7,
    max: -1,
    text: (days) =>
      `You missed the deadline by ${Math.abs(days)} ${pluralize(Math.abs(days))}.`,
    color: alertColor.red,
  },
  {
    min: 0,
    max: 0,
    text: () => `Today's the day! Deadline is here.`,
    color: alertColor.red,
  },
  {
    min: 1,
    max: 7,
    text: (days) =>
      `Final week! Just ${days} ${pluralize(days)} left to complete your task.`,
    color: alertColor.orange,
  },
  {
    min: 8,
    max: 15,
    text: (days) =>
      `Time is ticking! Only ${days} ${pluralize(days)} left to finish your task.`,
    color: alertColor.green,
  },
  {
    min: 16,
    max: 30,
    text: (days) =>
      `Halfway through the month. ${days} ${pluralize(days)} left to meet your deadline.`,
    color: alertColor.green,
  },
  {
    min: 31,
    max: 40,
    text: (days) =>
      `Plenty of time left. ${days} ${pluralize(days)} left to plan and finish your task.`,
    color: alertColor.green,
  },
];
export default thresholds;
