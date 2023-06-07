const express = require('express')
const cors = require('cors')
class Server {

    constructor() {

        this.app = express();
        this.userPath = '/api/user'

        //middlewares
        this.middlewares();

        this.routes();

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