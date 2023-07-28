const { Router } = require("express");
const { getFiles, uploadFile } = require("../controllers/uploads");



const router = Router();


router.get( '/', getFiles)

router.post( '/', uploadFile )


module.exports = router;
