const { Exams } = require("../../database");

module.exports = async function (user, contract) {
  let reviewed = await contract.ers.getReviewed(user.publicAddress);
  return Promise.all(reviewed.map(async elem=>{
    let ret = {id: elem};
    ret.marks = await contract.ers.viewFinalMarks(elem);
    ret.marks = ret.marks.map(elem=>elem.toNumber());
    return ret;
  }))
};
