const { Exams, AssignedReviews } = require("../../database");

module.exports = async function (examId, info) {
  return new Promise((resolve, reject) => {
    Exams.findOne({ _id: examId }, (err, exam) => {
      if (err) return reject(err);
      if (!exam) return reject({ message: "Exam not found" });
      exam.reviewers.push(info.publicAddress.toLowerCase());
      exam.save(async (err, doc) => {
        if (err) return reject(err);
        let assignment = new AssignedReviews({
          reviewerPA: info.publicAddress.toLowerCase(),
          examId,
          count: 0,
        });
        await assignment.save();
        return resolve(doc);
      });
    });
  });
};
