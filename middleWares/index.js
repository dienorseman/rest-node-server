const validateFields    = require("../middleWares/validate-flieds");
const validateJWT       = require("../middleWares/validate-jwt");
const checkUserState    = require("../middleWares/check-user-state");
const valiateRoles      = require("../middleWares/validate-roles");
const JWTNotEmpty       = require("./validate-jwt-not-empty");
const validateFile      = require('./file-validate')


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...checkUserState,
    ...valiateRoles,
    ...JWTNotEmpty,
    ...validateFile,
}