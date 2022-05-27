const passport = require("passport");
const { respondError } = require("./routesUtils");
const { getNonce } = require("../controller/genericCtrl");
const genericCtrl = require("../controller/genericCtrl");

module.exports = function (app, contract) {
  app.route("/api/login").post(
    passport.authenticate("local", {
      failureRedirect: "/failure",
      failureFlash: true,
    }),
    async (req, res) => {
      try {
        res.status(200).send({
          name: req.user.name,
          publicAddress: req.user.publicAddress,
          permissions: req.user.permissions,
        });
      } catch (err) {
        respondError(err, res);
      }
    }
  );

  app.route("/api/answer-sheets/:rollNo").get(async (req, res) => {
    try {
      let answerSheets = await genericCtrl.getAnswerSheets(
        req.params.rollNo,
        contract
      );
      return res.status(200).json({ answerSheets });
    } catch (err) {
      respondError(err, res);
    }
  });

  app.route("/api/files/:answerSheetId").get(async (req, res) => {
    try {
      let fileName = await genericCtrl.findFile(
        req.user,
        { answerSheetId: req.params.answerSheetId },
        contract
      );
      res.sendFile(process.cwd() + "/files/answer-sheets/" + fileName);
    } catch (err) {
      respondError(err, res);
    }
  });

  app.route("/api/results/:answerSheetId").get(async (req, res) => {
    try {
      let result = await genericCtrl.findResult(req.params.answerSheetId, contract);
      res.json({result});
    } catch (err) {
      respondError(err, res);
    }
  });

  app.route("/api/login/:publicAddress").get(async (req, res) => {
    try {
      let nonce = await getNonce(req.params.publicAddress);
      res.status(200).send({ nonce });
    } catch (err) {
      respondError(err, res);
    }
  });

  app
    .route("/failure")
    .post((req, res) => {
      res.status(401).json({ error: req.flash("error")[0] });
    })
    .get((req, res) => {
      res.status(401).json({ error: req.flash("error")[0] });
    });

  app.route("/unauthorized").get((req, res) => {
    res.status(400).json({ error: "Unauthorized" });
  });

  app.route("/api/logout").get((req, res) => {
    req.logout();
    res.redirect("/public");
  });
};
