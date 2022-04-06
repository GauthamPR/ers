const crypto = require('crypto');

module.exports = function(string){
    let hash = crypto.createHash('md5').update(string).digest('hex');
    return hash;
}