const path = require('path');
const { request, response } = require("express");



const getFiles = ( req = request, res = response ) => {
    res.json({
        msg: 'getFiles'
    })
}

const uploadFile = ( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No uploaded files on the request'})
        return;
    }

    const file = req.files.file;


    const uploadPath = path.join(__dirname + '../../uploads/' + file.name);

    file.mv(uploadPath, err => {
        if( err ) {
            return res.status(500).json(err);
        }

        res.json({
            msg: `uploaded to ${uploadPath}` 
        })
    })
}


module.exports = {
    getFiles,
    uploadFile
}
