const { Exams } = require("../../database");

module.exports = async function (examId, reviewerId) {
  return new Promise((resolve, reject) => {
    Exams.findOne({ _id: examId }, (err, exam) => {
      if (err) return reject(err);
      if(!exam) return reject({message: "Exam not found"});
      exam.reviewers = exam.reviewers.filter((elem)=>elem!=reviewerId);
      exam.save((err)=>{
        if(err) return reject(err);
        return resolve();
      })
    });
  });
};
