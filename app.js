const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser')
const urlRoute = require('./routes/url');
const keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(require('cors')())
// let ip;
// app.use(function(req, res, next) {
//     let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     if (ip.substr(0, 7) === "::ffff:") {
//         ip = ip.substr(7)
//     }
// })

app.use('/api/url', urlRoute)

module.exports = app;
