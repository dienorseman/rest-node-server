const { Router } = require("express");
const { 
    get, 
    post, 
    put, 
    patch, 
    delete_user
} = require("../controllers/user");

const router = Router();

router.get("/", get);

router.post("/", post);

router.put("/:id", put);

router.patch("/", patch);

router.delete("/", delete_user);

module.exports = router;
