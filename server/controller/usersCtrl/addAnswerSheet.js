const logger = require("../../utils/log");
const hashFile = require("../../utils/hashFile");
const hashString = require("../../utils/hashString");

module.exports = async function (contract, body, user) {
    
  logger.info("File: <" + body.file.filename + "> uploaded by:" + user.publicAddress);
  let answerSheetHash = await hashFile(body.file.path);
  await contract.ers.createCode(
    body.examId,
    hashString(body.studentRollNo),
    answerSheetHash,
    user.publicAddress,
    { from: contract.account }
  );
  let ret = await contract.ers.codes(answerSheetHash);
  return ret;
};
