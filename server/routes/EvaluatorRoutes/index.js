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
};
