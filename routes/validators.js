const { check } = require("express-validator");

const { isRoleValid, emailExists, userExistsById } = require( "../helpers/db-validators");
const { validateFields } = require("../middleWares/validate-flieds");


const userValidators =() => {
    return [
        check("name", "Name is required").not().isEmpty(),
        check("password", "Password must be 6 characters long").isLength({ min: 6 }),
        check("email", "Email is required").isEmail(),
        check("role", "Role is required").not().isEmpty(),
        check("role").custom( isRoleValid ),
        check("email").custom( emailExists ),
        validateFields,
    ]
}

const putUserValidators = () => {
    return [
        check("id", "Id is not valid").isMongoId(),
        check("id").custom( userExistsById ),
        check("email").custom( emailExists ),
        check("role").custom( isRoleValid ),
        validateFields,
    ]
}

module.exports = {
    userValidators,
    putUserValidators
}