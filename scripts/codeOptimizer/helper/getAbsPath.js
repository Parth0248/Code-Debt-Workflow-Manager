import path from "path";
const absolutePath = (relativePath) => {
  return path.resolve(relativePath);
}
export default absolutePath;