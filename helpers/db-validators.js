const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async ( role = "" ) => {
    const validRole = await Role.findOne({ role });
    if ( !validRole ) {
        throw new Error(`Role ${ role } is not valid`);
    }
};

const emailExists = async ( email = "" ) => {
    const emailInUse = await User.findOne({ email });
    if ( emailInUse ) {
        throw new Error(`Email is already in use`);
    }
};

const userExistsById = async ( id = "" ) => {
    const userExists = await User.findById( id );
    if ( !userExists ) {
        throw new Error(`User with id ${ id } does not exist`);
    }
};

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
};