const ensure = require("../middlewares/ensure");
const fileMgr = require("../../utils/fileMgr");
const respondError = require("../routesUtils/respondError");
const usersCtrl = require("../../controller/usersCtrl");

module.exports = function (app) {
  app.route("/api/answerSheet").put(ensure.authenticated, (req, res) => {
    fileMgr.store.single("answerSheet")(req, res, async (err) => {
      if (err) return respondError(err, res);
      try {
        req.body.file = req.file;
        let result = await usersCtrl.addAnswerSheet(req.body, req.user);
        res.status(200).json({ result });
      } catch (err) {
        respondError(err, res);
        let files = [];
        for (let key in req.files) {
          files.push(
            req.files[key][0].destination + "/" + req.files[key][0].filename
          );
        }
        fileMgr.remove(files);
      }
    });
  });

  app.route("/api/exams").get(ensure.authenticated, async (req, res) => {
    try {
      let exams = await usersCtrl.getExams();
      res.status(200).json({ exams });
    } catch (err) {
      respondError(err, res);
    }
  });

  app.route("/api/myself").get(ensure.authenticated, async (req, res) => {
    try {
      res
        .status(200)
        .json({
          publicAddress: req.user.publicAddress,
          name: req.user.name,
          permissions: req.user.permissions,
        });
    } catch (err) {
      respondError(err, res);
    }
  });
};
