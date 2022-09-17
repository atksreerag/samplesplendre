const mongoose = require('mongoose')

module.exports = connection = async () =>{
    try {
        await mongoose.connect("mongodb+srv://sreeragatk3:dcrZEiTEvtP38jP6@cluster0.ttu4bsa.mongodb.net/testone?retryWrites=true&w=majority") 
        console.log('Db connected')
    } catch (error) {
        console.log(`Sorry something went wrong..db not connected ${error}`);
    }
}
