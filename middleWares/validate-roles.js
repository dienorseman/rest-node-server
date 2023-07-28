const { response } = require('express');

const isAdminRole = async ( req, res = response, next ) => {
    
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Token must be validated first'
        })
    }

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not an admin`
        })
    }

    next();
}

const hasRole = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Token must be validated first'
            })
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `Service requires one of these roles: ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole, 
    hasRole
}