const fs = require('fs');
const logger = require('../log');

module.exports = function (relativeFilePaths){
    relativeFilePaths.forEach(filePath=>{
        fs.unlink((process.cwd() + "/" + filePath), err=>{
            if(err)
                logger.fatal(err);
        })
    })
}