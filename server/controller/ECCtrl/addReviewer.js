const { Exams } = require("../../database");

module.exports = async function (examId, info) {
  return new Promise((resolve, reject) => {
    Exams.findOne({_id: examId}, (err, exam)=>{
      if(err) return reject(err);
      if(!exam) return reject({message: "Exam not found"});
      exam.reviewers.push(info.publicAddress);
      exam.save((err, doc)=>{
        if(err) return reject(err);
        return resolve(doc);
      })
    })
  });
};
