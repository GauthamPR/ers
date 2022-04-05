const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const { Users } = require("../../database");
const { logger } = require("../../utils");
const { ObjectID } = require("mongodb");

module.exports = {
  setStrategies: function (app) {
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      Users.findOne({ _id: new ObjectID(id) }, (err, doc) => {
        if (err) logger.error(err);
        done(null, doc);
      });
    });

    passport.use(
      new LocalStrategy(
        {
          usernameField: "publicAddress",
          passwordField: "signature",
        },
        (publicAddress, signature, done) => {
          Users.findOne({ publicAddress }, (err, user) => {
            logger.info("User", publicAddress, "attempted to login");
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: "User Not Registered" });
            }
            // if (!bcrypt.compareSync(signature, user.password)) {
            //   return done(null, false, { message: "Wrong Password" });
            // }
            return done(null, user);
          });
        }
      )
    );
  },
};
