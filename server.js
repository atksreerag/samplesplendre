const express = require('express');
const app = express();
const connection = require('./services/database.service');


require('./startup/routes')(app);
const PORT = 3000;
app.listen(PORT,() => {
    connection()
    console.log(`Server Started at Port ${PORT}`)
})

