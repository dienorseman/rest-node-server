const { response, request } = require("express");
const { User, Product, Category } = require("../models");
const { ObjectId } = require('mongoose').Types

const allowedCollections = [
    'users',
    'category',
    'products',
]

const searchItem = async ( termn = '', collection , res = response ) => {
    const isMongoId = ObjectId.isValid( termn )
    if ( isMongoId ) {
        const item = await collection.findById( termn );
        return res.json( {
            results: ( item && item.state ) ? [ item ] : []
        } )
    } else {
        const regex = new RegExp( termn, 'i' )
        const items = await collection.find( {
            $or: [ { name: regex }, { email: regex } ],
            state: true
        } )
        return res.json( {
            results: ( items ) ? [ items ] : []
        } )
    }
}

const searchProducts = async ( termn = '', res = response ) => {
    const isMongoId = ObjectId.isValid( termn )
    if ( isMongoId ) {
        const product = await Product.findById( termn ).populate( 'category', 'name' );
        return res.json( {
            results: ( product && product.state ) ? [ product ] : []
        } )
    } else {
        const regex = new RegExp( termn, 'i' )
        const products = await Product.find( {
            $or: [ { name: regex } ],
            state: true
        } ).populate( 'category', 'name' )
        return res.json( {
            results: ( products ) ? [ products ] : []
        } )
    }
}



const search = ( req = request, res = response ) => {
    try {
        const { colection, termn } = req.params

        if( !allowedCollections.includes( colection ) ) {
            return res.status(400).json({
                error: `${colection} is not valid `
            })
        }

        switch (colection) {
            case 'users':
                searchItem( termn, User, res )
                break;

            case 'products':
                searchProducts( termn, res )
                break;
            
            case 'category':
                searchItem( termn, Category, res )  
                break;

            default:
                res.status(500).json({
                    error: 'there is no search for this one yet'
                })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    search
}