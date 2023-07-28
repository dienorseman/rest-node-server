const { Router } = require("express");
const { search } = require("../controllers/search");


const router = Router();

router.get( '/:colection/:termn', search)

module.exports = router