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

const userIsActiveById = async (uid = "") => {
  const userIsActive = await User.findById(uid);

  if (!userIsActive) {
    throw new Error(`User with id ${uid} does not exist`);
  }

  if (!userIsActive.state) {
    throw new Error(`User with id ${uid} is inactive`);
  }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById,
    userIsActiveById
};