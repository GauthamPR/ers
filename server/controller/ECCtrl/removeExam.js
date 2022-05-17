const { Exams } = require("../../database");

module.exports = async function (examId) {
  return new Promise((resolve, reject) => {
    Exams.deleteOne({ _id: examId }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};
