const { Exams, AssignedReviews } = require("../../database");
const hashString = require("../../utils/encAndHashStr");
const logger = require("../../utils/log");

module.exports = async function (user, info, contract) {
  await contract.ers.addMarks(
    info.answerSheetId + user.publicAddress,
    info.answerSheetId,
    user.publicAddress,
    info.marks,
    { from: contract.account }
  );
  logger.info("Successful");
};
