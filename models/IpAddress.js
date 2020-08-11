const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipAddressSchema = new Schema({
    ip: {
        type: String
    }
})

module.exports = mongoose.model('urls', ipAddressSchema);
