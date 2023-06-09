const { check } = require("express-validator");

const validators =() => {
    return [
        check("name", "Name is required").not().isEmpty(),
        check("password", "Password must be 6 characters long").isLength({ min: 6 }),
        check("email", "Email is required").isEmail(),
        check("role", "Role is required").not().isEmpty(),
        check("role", "Role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    ]
}

module.exports = validators;