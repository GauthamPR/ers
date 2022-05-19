const { Exams } = require("../../database");

module.exports = async function (user, contract) {
  let yetToReview = await contract.ers.getYetToReview(user.publicAddress);
  return yetToReview.reduce((total, elem) => {
    if (elem != "" && elem.length > 0) total.push(elem);
    return total;
  }, []);
};
