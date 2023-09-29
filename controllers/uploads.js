const path                          = require('path');
const fs                            = require('fs');

const { request, response }         = require('express');
const { v2: cloudinary }            = require('cloudinary');
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile : uploadHelper } = require('../helpers');
const { User, Product }             = require('../models');


const getImage = async ( req = request, res = response ) => {
    const { id, collection} = req.params;
    let model;
    try { 
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
        if ( model.img ) {
            const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
            if ( !fs.existsSync( imgPath ) ) { 
                return res.sendFile(path.join(__dirname, '../uploads/no-image.jpg'));
            }
            res.status(200).sendFile(imgPath);
        }
    } catch (error) {
        res.status(400).json({msg: error});    
    }
}

const uploadFile = async ( req = request, res = response ) => {
    const validExtensions = ['txt', 'md'];
    try { 
        const uploadedFile = await uploadHelper(req.files, validExtensions);
        res.json({msg: `file uploaded: ${uploadedFile}` });
    } catch (error) {
        res.status(400).json({msg: error});  
    }
}

const updateImage = async ( req = request, res = response ) => {
    const { id, collection} = req.params;
    let model;
    try { 
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
        if ( model.img ) {
            const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
            if ( fs.existsSync( imgPath ) ) {
                fs.unlinkSync( imgPath );
            }
        }
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const uploadedFile = await uploadHelper(req.files, validExtensions, `${collection}`);
        model.img = uploadedFile;
        await model.save();
        res.json({ msg: model });
    } catch (error) {
        res.status(400).json({msg: error});
    }

}

const updateImageCloudinary = async ( req = request, res = response ) => {
    const { id, collection} = req.params;
    let model;
    try { 
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

        if ( model.img ) {
       
        }

        const { tempFilePath } = req.files.file

        const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
       
        model.img = secure_url;

        await model.save()

        res.json( model );
    } catch (error) {
        res.status(400).json({msg: error});
    }

}

module.exports = {
    getImage,
    uploadFile,
    updateImage
}