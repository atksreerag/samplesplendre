const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const router = require('../router/user');
const userRouter = require('../router/user');
const error = require('../middleware/error')


module.exports = function(app) {
    app.use(express.json());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));
    //user routes .....
    
    app.use('/api/user',userRouter)
    app.use(error)
	
	
};
