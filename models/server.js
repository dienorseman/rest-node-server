const express               = require("express");
const cors                  = require("cors");
const fileUpload            = require("express-fileupload");
const { createServer }      = require('http');

const { dbConnection }      = require("../database/config");
const { randomizeUserDb }   = require('../helpers');
const { socketController }  = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();

    this.server = createServer( this.app );

    this.io = require('socket.io')( this.server );

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/user',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      public: '/'
    };

    this.dbConnect();


    this.middlewares();

    this.routes();

    this.randomizedUserList = [];
    this.listUsers();

    this.sockets();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // body read and parse
    this.app.use( express.json() );

    // request logger
    // this.app.use(( req, res, next ) => {
    //   console.log(
    //     `${req.method} request to ${req.url} at ${new Date()} from ${req.ip}`
    //   );
    //   next();
    // });

    //public directory
    this.app.use(express.static("public"));

    //file upload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.public, require("../routes/public"));
  }

  sockets() {
    // this.io is undefined in the socketController function
    this.io.on( 'connection', ( socket ) => socketController( socket, this.io ) );
  }

  listen( port ) {
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  listUsers() {
    randomizeUserDb().then(( users ) => {
      this.randomizedUserList = users;
    });
  }
}

module.exports = Server;
