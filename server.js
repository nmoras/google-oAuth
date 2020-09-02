const express = require('express')

const app = express();

app.use( express.static('my-app/build/') );

const PORT = process.env.PORT || 8080;

const orm = require( './db/orm.mongoose' );

app.use( express.json() );

app.use( express.urlencoded({ extended: true }) );

const passport = require("passport");

const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')

const key = require('./config/key')

const cookieSession = require("cookie-session");

passport.use(
    new GoogleStrategy(
        {
    //options for the Google strat
        callbackURL:'/auth/google/callback',
        clientID: key.google.clientId,
        clientSecret: key.google.clientSecret
        }, (accessToken, refreshToken, profile, done) => {
            console.log("access token: ", accessToken)
            User.findOne({googleId: profile.id}).then((currentUser) =>{
                if(currentUser){
                    done(null, currentUser)
                } else {
                    new User({
                        googleId:profile.id,
                    }).save().then( (newUser) =>{
                        done(null, newUser);
                    });
                }
            })
        })
);

app.get("auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

app.get("/auth/google/callback",passport.authenticate('google'),(req, res)=>{
    res.send(req.user)
    res.send("you reached the redirect URI")
})

app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user);
});

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
User.findById(id).then(user => {
    done(null, user);
});
});

app.use(cookieSession({
    // milliseconds of a day
    maxAge: 24*60*60*1000,
    keys:[key.session.cookieKey]
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

app.listen( PORT, function(){
    console.log( `[job organizer server] RUNNING, http://localhost:${PORT}` );
 });