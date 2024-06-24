import path from "path";
const getAbsolutePath = (relativePath) => {
  return path.resolve(relativePath);
};
export default getAbsolutePath;
