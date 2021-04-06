const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();

const port = process.env.PORT || 6600;
app.listen(port, ()=> {
    console.log(`Connected to port ${port}`);
});