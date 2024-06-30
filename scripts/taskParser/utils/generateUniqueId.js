import uuid5 from "uuid5";

const generateUniqueId = (content, username, date) => {
  const hash = uuid5(content + username + date, uuid5.URL);
  return hash;
};

export { generateUniqueId };
