//Name of the File : hashing-a-file-using-nodejs.js
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const logger = require("./log");

var getHash = (content) => {
  var hash = crypto.createHash("md5");
  //passing the data to be hashed
  data = hash.update(content, "utf-8");
  //Creating the hash in the required format
  gen_hash = data.digest("hex");
  return gen_hash;
};

module.exports = async function(location){
    return new Promise((resolve, reject)=>{
        location = path.join(process.cwd(), location);
        //Creating a readstream to read the file
        var myReadStream = fs.createReadStream(location);
        
        var rContents = ""; // to hold the read contents;
        myReadStream.on("data", function (chunk) {
          rContents += chunk;
        });
        myReadStream.on("error", function (err) {
          return reject(err);
        });
        myReadStream.on("end", function () {
          //Calling the getHash() function to get the hash
          var content = getHash(rContents);
          return resolve(content);
        });
    })
}
