const express               = require("express");
const cors                  = require("cors");
const { dbConnection }      = require("../database/config");
const { randomizeUserDb }   = require('../helpers')
const fileUpload            = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/user",
      products: "/api/products",
      search: '/api/search',
      uploads: "/api/uploads",
    };

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
    // CORS
    this.app.use(cors());

    // body read and parse
    this.app.use(express.json());

    // request logger
    this.app.use((req, res, next) => {
      console.log(
        `${req.method} request to ${req.url} at ${new Date()} from ${req.ip}`
      );
      next();
    });

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
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`listenging on ${port}`);
    });
  }

  listUsers() {
    randomizeUserDb().then((users) => {
      this.randomizedUserList = users;
    });
  }
}

module.exports = Server;
