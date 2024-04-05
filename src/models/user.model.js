const mongoose = require('mongoose');

const collection = 'users';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,

    email:{
        type: String,
        unique: true
    }
})

module.exports = mongoose.model(collection,userSchema);