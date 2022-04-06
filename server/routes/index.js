const genericRoutes = require('./genericRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app){
    genericRoutes(app);
    userRoutes(app);

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