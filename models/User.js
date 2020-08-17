const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserAgent: {
        type: String,
        // required: true
    },
    UTM: {
        type: String,
        // required: true
    },
    language: {
        type: String,
        // required: true
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
    },
    dataTime: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema);
