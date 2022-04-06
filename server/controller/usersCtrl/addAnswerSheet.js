const logger = require("../../utils/log");
const hashFile = require("../../utils/hashFile");
const hashString = require("../../utils/hashString");

module.exports = async function (contract, body, user) {
  let ret =
    "File: <" + body.file.filename + "> uploaded by:" + user.publicAddress;
  logger.info(ret);
  let answerSheetHash = await hashFile(body.file.path);
  await contract.ers.createCode(
    body.examId,
    hashString(body.studentRollNo),
    answerSheetHash,
    user.publicAddress,
    { from: contract.account }
  );
  ret = await contract.ers.codes(answerSheetHash);
  return ret;
};
