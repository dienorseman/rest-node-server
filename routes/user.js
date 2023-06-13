const { Router } = require("express");

const { userValidators, putUserValidators } = require('./validators');


const { 
    get, 
    post, 
    put, 
    patch, 
    delete_user,
} = require("../controllers/user");


const router = Router();

router.get("/", get);

router.post("/", userValidators(), post);

router.put("/:id", putUserValidators() ,put);

router.patch("/", patch);

router.delete("/", delete_user);

module.exports = router;
