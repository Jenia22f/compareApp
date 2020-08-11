const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    sudId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    ip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    os: {
        type: String,
        required: false,
    },
    browser: {
        type: String,
        required: false,
    },
    connectionType: {
        type: String,
        required: false,
    },
    deviceType: {
        type: String,
        required: false,
    },
    deviceModel: {
        type: String,
        required: false,
    },
    userAgent: {
        type: String,
        required: false,
    },
    bot: {
        type: String,
        required: false,
    },
    unique: {
        type: String,
        required: false,
    },
    destination: {
        type: String,
        required: false,
    },

})
module.exports = mongoose.model('urls', userSchema);
