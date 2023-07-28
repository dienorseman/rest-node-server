require('dotenv').config()

const Server = require('./models/server')

const server = new Server()

const port = process.env.PORT

global.serverInstance = server

console.clear()

server.listen( port )

