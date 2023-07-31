const { check }       = require("express-validator");

const {
  emailExists,
  userExistsById,
  isRoleValid,
  categoryExistsById,
  productExistsById,
  allowedCollections
}                     = require("../helpers");
const {
  validateFields,
  validateJWT,
  checkUserState,
  hasRole,
  isAdminRole,
  JWTNotEmpty,
  validateFile,
}                     = require("../middleWares");


const admingetUsersValidators = () => {
  return [validateJWT, isAdminRole];
};

const userValidators = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password must be 6 characters long").isLength({
      min: 6,
    }),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    check("role").custom(isRoleValid),
    check("email").custom(emailExists),
    validateFields,
  ];
};

const putUserValidators = () => {
  return [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userExistsById),
    check("email").custom(emailExists),
    check("role").custom(isRoleValid),
    validateFields,
  ];
};

const deleteUserValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(userExistsById),
    checkUserState,
    validateFields,
  ];
};

const postLoginValidators = () => {
  return [
    check("email", "Email is required").isEmail(),
    check("password", "Passwrd is required").not().isEmpty(),
    validateFields,
  ];
};

const googleLoginValidators = () => {
  return [JWTNotEmpty, validateFields];
};

const postCategoryValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ];
};

const putCategoryValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id").custom(categoryExistsById),
    check("name", "Name is required").notEmpty(),
    validateFields,
  ];
};

const deleteCategoryValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ];
};

const patchCategoryValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ];
};

const createProductValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("name", "Name is required").notEmpty(),
    check("category", "Category is not valid").isMongoId(),
    check("category").custom(categoryExistsById),
    validateFields,
  ];
};

const updateProductValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ];
};

const deleteProductValidators = () => {
  return [
    validateJWT,
    hasRole("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(productExistsById),
    validateFields,
  ];
};

const updateImageValidators = () => {
  return [
    check("id", "Id is not valid").isMongoId(),
    check('collection').custom( ( c ) => allowedCollections( c, ['users','products'] ) ),
    validateFile,
    validateFields,
  ];
}

module.exports = {
  admingetUsersValidators,
  userValidators,
  putUserValidators,
  deleteUserValidators,
  postLoginValidators,
  googleLoginValidators,
  putCategoryValidators,
  postCategoryValidators,
  deleteCategoryValidators,
  patchCategoryValidators,
  createProductValidators,
  updateProductValidators,
  deleteProductValidators,
  updateImageValidators,
};
