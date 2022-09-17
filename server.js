const express = require('express');
const app = express();
const connection = require('./services/database.service');
//const startup = require('./startup/routes')
//const startup =  require('./startup/routes')
//const userRouter = require('./router/user');
//user routes .....

require('./startup/routes')(app);
const PORT = 3000;
app.listen(PORT,() => {
    connection()
    console.log(`server started at ${PORT}`)
})

