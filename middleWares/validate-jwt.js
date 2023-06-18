const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');



const validateJWT = async ( req, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No token provided'
        })
    }

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

            console.log(user);

            req.user = user;

            req.uid = uid;


            next(); 
    
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                msg: 'Invalid token'
            })
        }

}


module.exports = {
    validateJWT
}