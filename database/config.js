const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/coffe')
        const db = mongoose.connection;
        console.log(`Connected to database ${db.name} on host ${db.host}`);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    dbConnection
}
