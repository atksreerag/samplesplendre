const winston = require('winston');
const config = require('../config.json')
module.exports = async(req, res, next) => {
    try {
        winston.error(err.message, err)
        const error = config.error
        return res.status(400).send(error)
    } catch (error) {
        ///
    }
}