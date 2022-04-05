const logger = require('../../utils/log');

module.exports =  function(err, res){
    logger.error(err);
    let message;
    if(err.code === 'ER_BAD_NULL_ERROR')
        message = err.sqlMessage;
    else if(err.code==='ER_DUP_ENTRY' && (/for key 'user.email'/).test(err.message))
        message = "User already exists";
    else
        message = err.message || err;
    res.status(400).json({error: message});
}