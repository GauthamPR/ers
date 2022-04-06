const { Exams } = require("../../database");

module.exports = async function () {
  return new Promise((resolve, reject) => {
    Exams.findAll({}, (err, exams) => {
      if (err) return reject(err);
      return resolve(exams);
    });
  });
};
