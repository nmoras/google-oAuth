const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const key = require('./key')

const callback = (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
};

passport.use(
    new GoogleStrategy({
    //options for the Google strat
    callbackURL:'/auth/google/callback',
    clientId: key.google.clientId,
    clientSecret: key.google.clientSecret
}), callback)


 // For the popup window, this will organize the initil login box on provider
 app.get( '/oauth/:google', function( req,res,next ){
    const provider = req.params.provider;
    console.log( `[/oauth/${provider}/] popup called.` );
    // we are running this, as it will generate code an actual function
    passport.authenticate(provider, (provider==='google'?{ scope: ['profile'] }:undefined))(req,res,next);
 });

 app.get('/auth/:provider', function( req,res,next ){
     const google = req.params.provider;

     passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })(req, res, next);
 });
 
  
  app.get('/auth/:provider/callback', function( req,res,next ){
    const google = req.params.provider;
    passport.authenticate('google', { failureRedirect: '/login' })(req, res,next);
  },
    
    function(req, res) {
    res.redirect('/');
  });