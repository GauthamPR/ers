const logger = require("../../utils/log");
const hashFile = require("../../utils/hashFile");

module.exports = async function (body, user) {
  let ret = "File: <" + body.file.filename + "> uploaded by:" + user.publicAddress;
  let hash = await hashFile(body.file.path);
  logger.info(ret);
  logger.info("Hash:", hash);
  return ret;
};
