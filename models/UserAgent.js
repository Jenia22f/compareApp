const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAgentSchema = new Schema({
    value: {
        type: String
    }
})


module.exports = mongoose.model('useragents', userAgentSchema);
