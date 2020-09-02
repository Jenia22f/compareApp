const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogsSchema = new Schema ({
    ip: {
        type: String
    },
    body: {
        type: Object
    },
    time: {
        type: String
    },
    method: {
        type: String
    },
    originalUrl: {
        type: String
    },
    status: {
        type: Number
    },
    userAgent: {
        type: String
    },
    application: {
        type: String
    },

})


module.exports = mongoose.model('logs', LogsSchema);
