const { AnswerSheets } = require("../../database");

module.exports = async function (user, info, contract) {
  let answerSheet = await AnswerSheets.findOne({hashValue: info.answerSheetId});
  if(!answerSheet)
    throw new Error("Unable to find file");
  return answerSheet.name;
};
