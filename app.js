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
//     let array = data.split('\n')
//         let arr1 = array.map(arr => arr.split('-'));
//         arr1.map(i => {
//            let newArr = []
//            let y = i.map(a => {
//            a = a.split('.').map(item => {
//                     if ((item.length < 1)) return item = '000'
//                     if (item.length === 1) return   item = '00' + item
//                     if (item.length === 2) return  item = '0' + item
//                     if (item.length === 3 || item.length > 3) return item
//                 })
//
//                newArr.push(a)
//            })
//                 if (!newArr[1]) return ['000', '000', '000', '000']
//            const ip = new Ip({
//                    firstDiapason: newArr[0].join(''),
//                    secondDiapason: newArr[1].join('')
//                })
//                ip.save()
//        });
//
//
//     });


app.use('/api/url', urlRoute)

module.exports = app;
