const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
const { Users } = require("../../database");
const { logger } = require("../../utils");
const { ObjectID } = require("mongodb");
const ethUtil = require("ethereumjs-util");

function verifySignature(address, signature, message) {
  const sig = ethUtil.fromRpcSig(ethUtil.addHexPrefix(signature));
  const msg = ethUtil.hashPersonalMessage(Buffer.from(message));
  const publicKey = ethUtil.ecrecover(msg, sig.v, sig.r, sig.s);
  const pubAddress = ethUtil.pubToAddress(publicKey);
  const recoveredAddress = ethUtil.addHexPrefix(pubAddress.toString("hex"));
  if (recoveredAddress == address) return true;
  else return false;
}

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

            if (verifySignature(publicAddress, signature, process.env.SECRET_MESSAGE) == false)
              return done(null, false, { message: "Signature not matching" });
            return done(null, user);
          });
        }
      )
    );
  },
};
