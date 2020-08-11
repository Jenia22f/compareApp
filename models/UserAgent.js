const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAgentSchema = new Schema({
    UserAgent: {
        type: String,
    },
    UTM: {
        type: String,
    }
})

module.exports = mongoose.model('useragents', userAgentSchema);
