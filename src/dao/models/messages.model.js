const mongoose = require('mongoose');

const collection = 'messages';

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
})

module.exports = mongoose.model('Messages',messagesSchema,collection);