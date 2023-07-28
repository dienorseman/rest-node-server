const { response } = require('express');

const JWTNotEmpty = (req, res = response, next) => {
    
        const token = req.header('Authorization');
    
        if ( !token || !token.startsWith('Bearer')) {
            return res.status(401).json({
                msg: 'No valid token provided'
            })
        }

        req.token = token.split(' ')[1];
  
        next();
    }

module.exports = {
    JWTNotEmpty
}
