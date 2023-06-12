const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_HOST)
        const db = mongoose.connection;
        console.log(`Connected to database ${db.name} on host ${db.host}`);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    dbConnection
}
