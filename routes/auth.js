const { Router } = require("express");

const { postLoginValidators } = require("./validators");

const { post } = require("../controllers/auth");

const router = Router();

router.post("/login", postLoginValidators(), post);

module.exports = router;