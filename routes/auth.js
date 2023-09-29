const { Router } = require('express');
const {
    postLoginValidators,
    googleLoginValidators,
    JWTValidators,
} = require('./validators');
const { 
    post, 
    googleSignIn,
    refreshToken
} = require('../controllers/auth');

const router = Router();

router.post('/login', postLoginValidators(), post);

router.post('/google', googleLoginValidators(), googleSignIn);

router.get('/', JWTValidators(), refreshToken);

module.exports = router;
