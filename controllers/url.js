const Ip = require('../models/IpAddress');
const errorHandler = require('../utils/errorHandler');

module.exports.getUrl = async function (req, res) {
    try {
        const black = [
            '1.0.0.0-1.0.0.255', '1.1.1.0-1.1.1.255', '1.119.0.0-1.119.127.255']
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //     const blackIp = await Ip.findOne({ip: ip})
        const blackIp = await black.find(el => el === ip)
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