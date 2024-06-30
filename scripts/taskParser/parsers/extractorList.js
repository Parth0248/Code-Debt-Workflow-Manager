import extractTODO from "./todo.js";
import extractFIXME from "./fixme.js";
import extractDP from "./dp.js";

const extractorList = {
  TODO: extractTODO,
  FIXME: extractFIXME,
  DP: extractDP,
};

export default extractorList;
