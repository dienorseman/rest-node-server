const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {

        this.app = express();
        this.userPath = '/api/user'
        this.dbConnect();

        //middlewares
        this.middlewares();

        this.routes();
    
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        //public directory  
        this.app.use( express.static('public') );
        this.app.use( cors() )
        this.app.use( express.json() )
    }

    routes() {
        this.app.use( this.userPath, require('../routes/user') )
    }

    listen( port ) {
        this.app.listen( port, () => {
            console.clear();
            console.log(`listenging on ${port}`);
        })
    }
}

module.exports = Server