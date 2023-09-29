const { Router }                = require("express");

const { uploadFile, 
        updateImage, 
        getImage 
}                               = require("../controllers/uploads");
const { updateImageValidators, 
        getImageValidators 
}                               = require("./validators");
const { validateFile }          = require("../middleWares");


const router = Router();

router.get( '/:collection/:id', getImageValidators(), getImage);

router.post( '/', validateFile, uploadFile );

router.put( '/:collection/:id', updateImageValidators(), updateImage)

module.exports = router;
