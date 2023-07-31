const path                          = require('path');
const fs                            = require('fs');
const { request, response }         = require('express');
const { uploadFile : uploadHelper } = require('../helpers');
const { User, Product }             = require('../models');


const getFiles = ( req = request, res = response ) => {
    res.json({
        msg: 'getFiles'
    })
}

const uploadFile = async ( req = request, res = response ) => {

    const validExtensions = ['txt', 'md'];
    
    try { 
        const uploadedFile = await uploadHelper(req.files, validExtensions);
        res.json({msg: `file uploaded: ${uploadedFile}` })
    } catch (error) {
        res.status(400).json({msg: error})     
    }

}

const updateImage = async ( req = request, res = response ) => {

    const { id, collection} = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById(id);
            if( !model ) {
                return res.status(400).json({ msg: `There is no user with such id (${id})`});
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if( !model ) {
                return res.status(400).json({ msg: `There is no product with such id (${id})`});
            }
            break;
        default:
            return res.status(500).json({ msg: 'I forgot to validate this' })
    }

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    try { 

        if ( model.img ) {
            const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
            if ( fs.existsSync( imgPath ) ) {
                fs.unlinkSync( imgPath );
            }
        }

        const uploadedFile = await uploadHelper(req.files, validExtensions, `${collection}`);
        model.img = uploadedFile;
        await model.save();

        res.json({ msg: model })

    } catch (error) {
        res.status(400).json({msg: error})     
    }

}

module.exports = {
    getFiles,
    uploadFile,
    updateImage
}