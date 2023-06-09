const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/coffe')
        console.log('database connected');
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    dbConnection
}
