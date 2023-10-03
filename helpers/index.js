const dbValidators          = require('./db-validators');
const generateJWT           = require('./generate-jwt');
const googleVerify          = require('./google-verify');
const randomizeUserDB       = require('./randomize-user-db');
const uploadFile            = require('./upload-file');
const allowedCollections    = require('./allowed-collections');
const verifyJwt             = require('./verify-jwt');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...randomizeUserDB,
    ...uploadFile,
    ...allowedCollections,
    ...verifyJwt,
}