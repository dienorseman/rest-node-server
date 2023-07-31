const { Router }                            = require("express");
const { getFiles, uploadFile, updateImage } = require("../controllers/uploads");
const { updateImageValidators }             = require("./validators");
const { validateFile }                      = require("../middleWares");



const router = Router();


router.get( '/', getFiles);

router.post( '/', validateFile, uploadFile );

router.put( '/:collection/:id', updateImageValidators(), updateImage)

module.exports = router;
