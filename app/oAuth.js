const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const key = require('./key')

passport.use(
    new GoogleStrategy({
    //options for the Google strat
    clientId: 'key.google.clientId',
    clientSecret: 'key.google.clientSecret'
}), ()=>{
    //passport callback function
})