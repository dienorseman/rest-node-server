const { response }  = require('express');
const jwt           = require('jsonwebtoken');
const User          = require('../models/user');


const validateJWT = async ( req, res = response, next ) => {

    // const token = req.header('x-token');

    let token = req.header('Authorization');

    
    if ( !token || !token.startsWith('Bearer')) {
        return res.status(401).json({
            msg: 'No valid token provided'
        })
    }

    token = token.substring(7);

    try {
        
            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );


            const user = await User.findById( uid );

            
            if ( !user ) {
                return res.status(401).json({
                    msg: 'User does not exist'
                })
            }

            if ( !user.state ) {
                return res.status(401).json({
                    msg: 'User is inactive'
                })
            }

            req.uid = uid;

            req.user = user;

            next(); 
    
        }
        catch (error) {
            // console.log(error);
            return res.status(401).json({
                msg: 'Invalid token'
            })
        }

}

module.exports = {
    validateJWT
}