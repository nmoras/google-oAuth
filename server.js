const express = require('express')

const app = express();

require('dotenv').config();

app.use( express.static('my-app/build/') );

const PORT = process.env.PORT || 8080;

const orm = require( './db/orm.mongoose' );

app.use( express.json() );

app.use( express.urlencoded({ extended: true }) );




app.listen( PORT, function(){
    console.log( `[job organizer server] RUNNING, http://localhost:${PORT}` );
 });