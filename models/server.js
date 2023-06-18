const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { randomizeUserDb } = require('../helpers/randomize-user-db');
class Server {

    constructor() {

        this.app = express();
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.dbConnect();

        //middlewares
        this.middlewares();

        this.routes();
        
        this.randomizedUserList = [];
        this.listUsers();
        
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
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.userPath, require('../routes/user') );
    }

    listen( port ) {
        this.app.listen( port, () => {
            console.clear();
            console.log(`listenging on ${port}`);
        })
    }

    listUsers() {
        randomizeUserDb()
            .then( users => {
                this.randomizedUserList = users;
            }
        )
    }

}

module.exports = Server