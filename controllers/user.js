const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');;


const get = async ( req = request, res = response ) => {

    let { limit = 5, from = 0 } = req.query;

    const maxLimit = 100;
    
    if ( limit > maxLimit ) {
        limit = maxLimit;
    }
    
    let users = await global.serverInstance.randomizedUserList;

    users = users.slice( from, limit );

    if ( users.length === 0 ) {
        res = response.status(404).json({
            msg: 'No users found'
        })
    }

    res.json({
        users
    })

}

const post = async( req = request, res = response ) => {

    const { name, email, password, role } = req.body;

    const user = new User( { name, email, password, role } )

    const salt = bcryptjs.genSaltSync(10);

    user.password = bcryptjs.hashSync( password, salt );

    await Promise.all([global.serverInstance.listUsers(), user.save()]);

    res.json({
        user
    })

}

const put = async ( req = request, res = response ) => {

    const id = req.params.id
    const { _id, _v, password, google, ...rest } = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const resp = await Promise.all([global.serverInstance.listUsers(), User.findByIdAndUpdate( id, rest, { new: true } )]);

    res.json({
        user: resp[1]
    })
}

const patch = ( req = request, res = response ) => {
    res.json({
        msg: 'patch - user'
    })
}

const delete_user = ( req = request, res = response ) => {
    const { id } = req.params;
    res.json({
        msg: 'delete - user',
        id
    })
}

module.exports = {
    get,
    post,
    put,
    patch,
    delete_user
}