const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('./key')

passport.serializeUser(function(user, done) {
    //passport.serializeUser() is setting id as cookie in user’s browser
    // console.log('the user is', user)
    console.log('serializing user.');
    /*
    From the user take just the id (to minimize the cookie size) and just pass 
    the id of the user to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done) {
      /*
      passport.deserializeUser() is getting id from the cookie
      which is then used in callback to get user info 
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
      */

    console.log('deserialize user.');
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

const callback = (accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails.value
      }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    // return done(err, user);
    // });
    console.log('newUser', newUser)
    return done(null, profile);
};

passport.use(
    new GoogleStrategy(
           {
      //options for the Google strat
        callbackURL:'http://localhost:8080/auth/google/callback',
        clientID: key.google.clientId,
        clientSecret: key.google.clientSecret
        }, callback) );

   
// passport.use(
//     new GoogleStrategy(
//         {
//     //options for the Google strat
//         callbackURL:'/auth/google/callback',
//         clientId: key.google.clientId,
//         clientSecret: key.google.clientSecret
//         }), callback)


//  //For the popup window, this will organize the initil login box on provider
//  app.get( '/oauth/:google', function( req,res,next ){
//     const provider = req.params.provider;
//     console.log( `[/oauth/${provider}/] popup called.` );
//     //we are running this, as it will generate code an actual function
//     passport.authenticate(provider, (provider==='google'?{ scope: ['profile', 'email'] }:undefined))(req,res,next);
//  });

//  app.get('/auth/:provider', function( req,res,next ){
//      const google = req.params.provider;

//      passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })(req, res, next);
//  });
 
  
//   app.get('/auth/:provider/callback', function( req,res,next ){
//        const google = req.params.provider;
//     passport.authenticate('google', { failureRedirect: '/login' })(req, res,next);
//   },
    
//     function(req, res) {
//     res.redirect('/');
//   });