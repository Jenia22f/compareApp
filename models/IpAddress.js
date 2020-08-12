const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipAddressSchema = new Schema({
    firstDiapason: {
        type: String
    },
    secondDiapason: {
        type: String
    }
})

module.exports = mongoose.model('ip', ipAddressSchema);
