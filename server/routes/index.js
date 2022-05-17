const genericRoutes = require('./genericRoutes');
const userRoutes = require('./userRoutes');
const ECRoutes = require('./ECRoutes');

module.exports = function(app, contract){
    genericRoutes(app, contract);
    userRoutes(app, contract);
    ECRoutes(app, contract);

    app.route('/files/*')
    .get((req, res)=>{
        res.sendFile(process.cwd() + decodeURI(req.url));
    })

    app.route('/assets/*')
    .get((req, res)=>{
        res.sendFile(process.cwd() + decodeURI(req.url));
    })

    app.route('*')
    .get((req, res)=>{
        res.sendFile(process.cwd() + '/build/views/index.html');
    })
    
}