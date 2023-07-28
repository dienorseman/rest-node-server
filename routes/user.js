const { Router } = require("express");

const { userValidators, putUserValidators, deleteUserValidators, admingetUsersValidators } = require('./validators');


const { 
    get, 
    post, 
    put, 
    patch, 
    delete_user,
    adminGet,
} = require("../controllers/user");


const router = Router();

router.get("/admin", admingetUsersValidators(), adminGet);

router.get("/", get);

router.post("/", userValidators(), post);

router.put("/:id", putUserValidators(), put);

router.patch("/", patch);

router.delete("/:id", deleteUserValidators(), delete_user);

module.exports = router;
