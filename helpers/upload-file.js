const { writeFileSync } = require('fs')
const path              = require('path');
const { v4: uuid }      = require('uuid');

const uploadFile = ( files, validExtensions, dirName = '' ) => {
    return new Promise( (resolve, reject) => {
        const file = files.file;
        const extension = file.name.split('.')[1];


        if ( !validExtensions.includes(extension) ) {
            reject(
                `Extension ${extension} is not valid, please use ${validExtensions}`
                )
        }
        
        const temporalName = uuid() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads', dirName, temporalName)

        file.mv(uploadPath, err => {
            if( err ) {
                reject( err )
            }

            resolve( temporalName )
        })
    } )
}

const logPosition = () => {
    writeFileSync(path.join(__dirname,'../test.txt'), 'helo');
}

module.exports = {
    uploadFile,
}