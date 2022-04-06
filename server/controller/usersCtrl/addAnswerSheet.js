const logger = require("../../utils/log");

module.exports = async function (body, user) {
  let ret = "File: <" + body.file.filename + "> uploaded by:" + user.publicAddress;
  logger.info(ret);
  return ret;
};
