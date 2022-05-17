const ensure = require("../middlewares/ensure");
const respondError = require("../routesUtils/respondError");
const ECCtrl = require("../../controller/ECCtrl");

module.exports = function (app, contract) {
  app.route("/api/exams").put(ensure.authenticated, async (req, res) => {
    try {
      await ECCtrl.addExams(req.body);
      res.status(200).json({ message: "Added successfully" });
    } catch (err) {
      respondError(err, res);
    }
  });

  app.route("/api/exams/:examId").delete(ensure.authenticated, async (req, res) => {
    try {
      await ECCtrl.removeExam(req.params.examId);
      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      respondError(err, res);
    }
  });

  // app.route("/api/myself").get(ensure.authenticated, async (req, res) => {
  //   try {
  //     res.status(200).json({
  //       publicAddress: req.user.publicAddress,
  //       name: req.user.name,
  //       permissions: req.user.permissions,
  //     });
  //   } catch (err) {
  //     respondError(err, res);
  //   }
  // });
};
