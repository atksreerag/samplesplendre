const express = require('express')
const router = express.Router()

exports.error = () => {
    try {
        res.status(400).json(false)
    } catch (error) {
        console.log("xsjxn");
    }
}
module.exports = router;