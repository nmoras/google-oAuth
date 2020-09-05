const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let users = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    googleId: {
        type: String,
        trim: true,
        required: true
    },
    email : {
        type: String,
        required: true,
        trim: true
        // match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    userVerified: {
        type: Boolean,
        required: true,
    },
    

},
    {
    timestamps: true
 })

module.exports = mongoose.model('users', users);