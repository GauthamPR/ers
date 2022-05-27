const { Users, AnswerSheets } = require("../database");
const encAndHashStr = require("../utils/encAndHashStr");

module.exports = {
  getNonce: function (publicAddress) {
    return new Promise((resolve, reject) => {
      try {
        Users.findOne({ publicAddress }, (err, user) => {
          if (err) return reject(err);
          if (!user) return reject("User not found");
          return resolve(user.nonce);
        });
      } catch (err) {
        console.error(err);
      }
    });
  },

  getAnswerSheets: async function (rollNo, contract) {
    let hashedRollNo = encAndHashStr(rollNo);
    let answerSheetIds = await contract.ers.findAnswerSheets(hashedRollNo);
    answerSheetIds = answerSheetIds.reduce((total, elem) => {
      if (elem != "" && elem.length > 0) total.push(elem);
      return total;
    }, []);
    let answerSheets = await Promise.all(
      answerSheetIds.map(async (id) => {
        let ret = { id };
        ret.marks = await contract.ers.viewFinalMarks(id);
        ret.marks = ret.marks.map((mark) => mark.toNumber());
        return ret;
      })
    );

    return answerSheets;
  },

  findFile: async function (user, info, contract) {
    let answerSheet = await AnswerSheets.findOne({
      hashValue: info.answerSheetId,
    });
    if (!answerSheet) throw new Error("Unable to find file");
    return answerSheet.name;
  },

  findResult: async function(answerSheetId, contract){
    let ret = {id: answerSheetId};
    ret.marks = await contract.ers.viewFinalMarks(answerSheetId);
    ret.marks = ret.marks.map(elem=>elem.toNumber());
    return ret;
  }
};
