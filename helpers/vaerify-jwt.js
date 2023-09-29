const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyJwt = async ( token = '' ) => {

    if ( !token || !token.startsWith('Bearer')) {
        return null
    }

    token = token.substring(7);

    try {

        if ( token.length < 10 ) {
            return null
        } else {

            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
            const user = await User.findById( uid );
            
            if( user ) {
                if ( user.state ) {
                    return user
                }
            } else {
                return null
            }
        }

    } catch ( err ) {
        return null
    }
};

module.exports = {
    verifyJwt,
};
