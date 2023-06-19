const { response } = require('express');

const Role = require('../models/role');

const isAdminRole = async ( req, res = response, next ) => {
    
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Token must be validated first'
        })
    }

    console.log(req.user);

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not an admin`
        })
    }

    next();
}

module.exports = {
    isAdminRole
}