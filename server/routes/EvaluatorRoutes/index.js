const ensure = require("../middlewares/ensure");
const respondError = require("../routesUtils/respondError");
const EvaluatorCtrl = require("../../controller/EvaluatorCtrl");

module.exports = function (app, contract) {
  app.route("/api/reviews").get(ensure.authenticated, async (req, res) => {
    try {
      let reviews = {};
      reviews.pending = await EvaluatorCtrl.getPendingReviews(req.user, contract);
      reviews.reviewed = await EvaluatorCtrl.getReviewed(req.user, contract);
      res.status(200).json(reviews);
    } catch (err) {
      respondError(err, res);
    }
  });

  app
    .route("/api/reviews/:answerSheetId")
    .put(ensure.authenticated, async (req, res) => {
      try {
        await EvaluatorCtrl.addReview(
          req.user,
          { answerSheetId: req.params.answerSheetId, marks: req.body.marks },
          contract
        );
        res.status(200).json({ message: "Added marks successfully" });
      } catch (err) {
        respondError(err, res);
      }
    });

  app
    .route("/api/files/:answerSheetId")
    .get(ensure.authenticated, async (req, res) => {
      try {
        let fileName = await EvaluatorCtrl.findFile(
          req.user,
          { answerSheetId: req.params.answerSheetId },
          contract
        );
        res.sendFile(process.cwd() + "/files/answer-sheets/" + fileName);
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
