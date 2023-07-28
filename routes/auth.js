const { Router } = require("express");

const { postLoginValidators, googleLoginValidators } = require("./validators");

const { post, googleSignIn} = require("../controllers/auth");

const router = Router();

router.post("/login", postLoginValidators(), post);

router.post("/google", googleLoginValidators(), googleSignIn);

module.exports = router;