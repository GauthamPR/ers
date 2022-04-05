const genericRoutes = require('./genericRoutes');

module.exports = function(app){
    genericRoutes(app);

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