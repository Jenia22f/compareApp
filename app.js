
const express = require('express')
const mongoose = require('mongoose')
const fs = require("fs");
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
const fetch = require('node-fetch');

const urlRoute = require('./routes/url');
const domainUrl = require('./routes/domains');
const keys = require('./config/keys')
const Logs = require('./models/Logs')
const app = express();



mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())
app.set('trust proxy',true);

app.use(morgan('combined', {
    skip: function (req, res) {
        const log = new Logs({
            ip: req.ip,
            body: req.body,
            time: req._startTime,
            method: req.method,
            originalUrl: req.originalUrl,
            status: res.statusCode,
            userAgent: req.headers['user-agent'],
            application: req.body.application
        })
        log.save()
    }

}))

//Start download black ip from ips.txt
// const Netmask = require('netmask').Netmask
// const Address6 = require('ip-address').Address6;
// const ip6addr = require('ip6addr')
// const Ip = require('./models/IpAddress');
// fs.readFile("./txt/ips.txt", "utf8",
//     (error, data) => {
//         let array = data.split('\n').map(arr => arr.split('-'));
//         array.map(i => {
//             if (i[0].includes('/') && ip6addr.parse(i[0].substr(0, i[0].indexOf('/'))).kind() === 'ipv6') {
//                 let ipv6Ip = ip6addr.createCIDR(i[0].split('/')[0], +i[0].split('/')[1])
//                 let addr = ip6addr.parse(i[0].split('/')[0])

//                 i[0] = i[0].split('/')[0].split(':')
//                 i[1] = ipv6Ip.last().toString()
//
//                 i[0] = i[0].map(el => {
//                     if ((el.length === 0)) return '0000'
//                     if (el.length === 1) return '000' + el
//                     if (el.length === 2) return '00' + el
//                     if (el.length === 3) return '0' + el
//                     if (el.length === 4) return el
//                 })
//                 let ipLast = new Address6(ipv6Ip.last().toString());
//                 let last = ipLast.inspectTeredo();
//                 i[1] = last.server4;
//
//                 i[0] = makeStartRangeForIpv6(i[0])
//                 let ipFirst = new Address6(i[0].join(':'));
//                 let first = ipFirst.inspectTeredo();
//                 i[0] = first.server4;
//             }
//             if (!i[1]) i[1] = '000.000.000.000'
//             if (i[0].includes('/')) {
//                 let diapIp = new Netmask(i[0]);
//                 i[0] = diapIp.base
//                 i[1] = diapIp.last
//             }
//
//             let ipDiapason = createDiapasonArray(i)
//             const ip = new Ip({
//                 firstDiapason: ipDiapason[0].join(''),
//                 secondDiapason: ipDiapason[1].join('')
//             })
//
//             ip.save()
//         });
//     });
//
// function makeStartRangeForIpv6(array) {
//     if (array.length < 8) {
//         array.push('0000')
//         makeStartRangeForIpv6(array)
//     }
//     return array
// }
//
// function createDiapasonArray(i) {
//     let newArr = []
//
//     let y = i.map(a => {
//         a = a.split('.').map(item => {
//             if ((item.length < 1)) return item = '000'
//             if (item.length === 1) return item = '00' + item
//             if (item.length === 2) return item = '0' + item
//             if (item.length === 3 || item.length > 3) return item
//         })
//         newArr.push(a)
//     })
//     return newArr
// }


//End download black ip from ips.txt
const domains = [
    'https://baitebavnbnek.info',
   'https://baitcbawanek.info'
]
isAvailable().then()
schedule.scheduleJob('5 * * * *', function(){
   isAvailable().then()
});

async function isAvailable() {
    for (const url of domains) {
        keys.domains = domains
        const request = await fetch(url)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
        console.log(request);
        if (request) {
            console.log(url , 'URL!!!!!')
            keys.mainDomain = url
            break
        } else {
            domains.shift()
            keys.domains = domains
        }
    }
}

app.use('/api/url', urlRoute)
app.use('/api/mydom', domainUrl)

module.exports = app;
