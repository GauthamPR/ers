const passport = require('passport');
const { respondError } = require('./routesUtils');

module.exports = function(app){
    
    app.route('/api/login')
    .post(passport.authenticate('local', {failureRedirect: '/failure', failureFlash: true}), async (req, res)=>{
        try{
            res.status(200).send({message: "yes"});
        }catch(err){
            respondError(err, res);
        }
    })
    
    app.route('/failure')
    .post((req, res)=>{
        res.status(401).json({error: req.flash('error')[0]});
    })
    .get((req, res)=>{
        res.status(401).json({error: req.flash('error')[0]});
    })

    app.route('/unauthorized')
    .get((req, res)=>{
        res.status(400).json({error: "Unauthorized"});
    })

    app.route('/api/logout')
    .get((req, res)=>{
        req.logout();
        res.sendStatus(200);
    })
}