const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAgentSchema = new Schema({
    UserAgent: {
        type: String,
        required: true
    },
    UTM: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('useragents', userAgentSchema);
