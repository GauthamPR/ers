const logger = require("../../utils/log");
const hashFile = require("../../utils/hashFile");
const hashString = require("../../utils/hashString");
const { AnswerSheets, AssignedReviews } = require("../../database");

async function findReviewer(body, user) {
  let assignment = await AssignedReviews.find({ examId: body.examId });
  if (!assignment || assignment.length < 1) {
    throw new Error("Assignment details not found");
  }
  let minAssigned = assignment[0];
  assignment.forEach((elem) => {
    if (elem.count < minAssigned.count) {
      minAssigned = elem;
    }
  });
  minAssigned.count++;
  await minAssigned.save();
  return minAssigned.reviewerPA;
}

module.exports = async function (contract, body, user) {
  logger.info(
    "File: <" + body.file.filename + "> uploaded by:" + user.publicAddress
  );
  let answerSheetHash = await hashFile(body.file.path);

  let reviewerPA = await findReviewer(body, user);

  let answerSheet = new AnswerSheets({
    name: body.file.filename,
    hashValue: answerSheetHash,
  });
  await answerSheet.save();
  await contract.ers.createAnswerSheet(
    body.examId,
    hashString(body.studentRollNo),
    answerSheetHash,
    user.publicAddress,
    reviewerPA,
    { from: contract.account }
  );
};
