const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('../../sreerag/sample/router/user')
const errorHandler = require('./controller/errorController')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json())
//user routes .....

app.use('/api/user',userRoutes)
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`server started at ${PORT}`)
})
const connection = async () =>{
    try {
        await mongoose.connect("mongodb+srv://sreeragatk3:dcrZEiTEvtP38jP6@cluster0.ttu4bsa.mongodb.net/testone?retryWrites=true&w=majority") 
        //await mongoose.connect('mongodb://localhost:27017/test');
        
    } catch (error) {
        console.log(error);
    }
}

connection()