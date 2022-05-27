const crypto = require("crypto");
const algo = "aes-256-cbc";

module.exports = function (str) {
  // Encryption
  let cipher = crypto.createCipheriv(
    algo,
    process.env.ENC_KEY.padStart(32, process.env.ENC_KEY),
    str.padStart(16, str)
  );
  let encrypted =
    cipher.update(str.toUpperCase(), "utf8", "hex") + cipher.final("hex");

  // Hashing
  let hash = crypto.createHash("md5").update(encrypted).digest("hex");
  return hash;
};
