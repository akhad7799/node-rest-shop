const mongoose = require('mongoose');

//export connection to mongodb
module.exports = function () {
    mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log('Connected to mongodb...');
        })
        .catch((err) => {
            console.error('Error during connection to mongodb');
        });
    mongoose.set('useFindAndModify', false);
}