const { Users } = require("../database");

module.exports = {
  getNonce: function (publicAddress) {
    return new Promise((resolve, reject) => {
      try {
        Users.findOne({ publicAddress }, (err, user) => {
          if (err) return reject(err);
          if (!user) return reject("User not found");
          return resolve(user.nonce);
        });
      } catch (err) {
        console.error(err);
      }
    });
  },
};
