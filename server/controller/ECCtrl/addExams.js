const { Exams } = require("../../database");

module.exports = async function (info) {
  return new Promise((resolve, reject) => {
    let babyExam = new Exams({
      name: info.name,
      month: info.month,
      year: info.year,
      type: info.type,
      reviewers: [],
    });
    babyExam.save((err, doc) => {
      if (err) return reject(err);
      return resolve(doc);
    });
  });
};
