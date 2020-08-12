const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserAgent: {
        type: String,
    },
    UTM: {
        type: String,
    },
    language: {
        type: String
    },
    reason: {
        type: String
    },
    url: {
        type: String
    },
    ip: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    bot: {
        type: String
    },
    unique: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema);
