const { Users } = require("../database");

module.exports = {
  getNonce: function (publicAddress) {
      return new Promise((resolve, reject)=>{
          Users.findOne({publicAddress}, (err, user)=>{
              if(err) return reject(err);
              return resolve(user.nonce);
          })
          
      })
  },
};
