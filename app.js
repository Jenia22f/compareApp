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
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())


// const fs = require("fs");
// const Ip = require('./models/IpAddress');
// fs.readFile("./txt/ips.txt", "utf8",
//     (error,data) => {
//     let arr = data.split('\n')
//         arr.forEach(i => {
//             i = i.replace(/ +/g, ' ').trim()
//             const ip = new Ip({
//                 ip: i
//             })
//             ip.save()
//         })
//     });

app.use('/api/url', urlRoute)

module.exports = app;
