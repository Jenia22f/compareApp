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
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const blackIp = await Ip.findOne({ip: ip})
        if (blackIp) {
            res.status(200).json(false)
        } else {
            res.status(200).json({status: true,
            url: 'https://test.com'})
        }

    } catch (e) {
        errorHandler(res, e)
    }
}