const mongoose = require('mongoose')
const config = require('../configuration/connection')
const dbUrl = config.DB_URL;
module.exports = connection = async () =>{
    try {
        await mongoose.connect(dbUrl) 
        console.log('Db Connected')
    } catch (error) {
        console.log(`Sorry something went wrong..db not connected ${error}`);
    }
}
