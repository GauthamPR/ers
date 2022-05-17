const { Exams } = require("../../database");

module.exports = async function () {
  return new Promise((resolve, reject) => {
    Exams.find({}, "id name month year type reviewers", (err, exams) => {
      if (err) return reject(err);
      return resolve(exams);
    });
  });
};
