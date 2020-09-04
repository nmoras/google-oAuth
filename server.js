const path = require('path');
const express = require('express')
const app = express();
const mongoose = require('mongoose')
app.use( express.static('./my-app/build/') );
const PORT = process.env.PORT || 8080;
const orm = require( './db/orm.mongoose' );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

require('./app/oAuth')
const passport = require("passport");
const cors = require('cors');
// const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const key = require('./app/key')
const cookieSession = require("cookie-session");

app.use(cookieSession({
    // milliseconds of a day
    maxAge: 24*60*60*1000,
    keys:[key.session.cookieKey]
  }));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());  

// Auth Routes
// app.get('/', (req,res) => res.send('you are not loggedin'))
// const userCheck = (req, res, next) => {
//     if(!req.user){
//         res.redirect('/')
//     } else {
//         next();
//     }
// }
app.get('/good', (req, res) => res.send(`welcome`))
app.get('/failed', (req, res) =>{
    res.send('You Failed to log in!')
})
// app.get('auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google', function(req, res, next) {
//     console.log('get function')
//     const passportAuth = passport.authenticate('google', {scope: ['profile', 'email']})(req, res, next);
//     console.log(passportAuth);
// });

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// Auth Routes
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
  // Successful authentication, redirect home.
//   res.send(req.user)
  res.redirect('/good');
}       
);


app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

mongoose.connect(key.mongodb.DB_URI, () => {
    console.log('connected to mongodb');
});

app.listen( PORT, function(){
    console.log( `[Google oAuth organizer server] RUNNING, http://localhost:${PORT}` );
 });

