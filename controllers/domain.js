const errorHandler = require('../utils/errorHandler');
const keys = require('../config/keys')
module.exports.getDomain = async function (req, res) {
    try {
        await res.status(200).json({
            status: true,
            key: keys.mainDomain,
            domains: keys.domains
        })
    } catch (e) {
            errorHandler(res, e)
    }
}
