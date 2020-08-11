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
    }
})

module.exports = mongoose.model('useragents', userSchema);
