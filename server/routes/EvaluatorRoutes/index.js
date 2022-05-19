const ensure = require("../middlewares/ensure");
const respondError = require("../routesUtils/respondError");
const EvaluatorCtrl = require("../../controller/EvaluatorCtrl");

module.exports = function (app, contract) {
  app.route("/api/reviews").get(ensure.authenticated, async (req, res) => {
    try {
      let reviews = {};
      reviews.pending = await EvaluatorCtrl.getReviews(req.user, contract);
      reviews.reviewed = [];
      res.status(200).json(reviews);
    } catch (err) {
      respondError(err, res);
    }
  });

  // app.route("/api/exams/:examId").delete(ensure.authenticated, async (req, res) => {
  //   try {
  //     await EvaluatorCtrl.removeExam(req.params.examId);
  //     res.status(200).json({ message: "Deleted successfully" });
  //   } catch (err) {
  //     respondError(err, res);
  //   }
  // });

  // app.route("/api/exams/:examId/reviewers").put(ensure.authenticated, async (req, res) => {
  //   try {
  //     await EvaluatorCtrl.addReviewer(req.params.examId, req.body);
  //     res.status(200).json({ message: "Added successfully" });
  //   } catch (err) {
  //     respondError(err, res);
  //   }
  // });

  // app.route("/api/exams/:examId/reviewers/:reviewerId").delete(ensure.authenticated, async (req, res) => {
  //   try {
  //     await EvaluatorCtrl.removeReviewer(req.params.examId, req.params.reviewerId);
  //     res.status(200).json({ message: "Deleted successfully" });
  //   } catch (err) {
  //     respondError(err, res);
  //   }
  // });

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
