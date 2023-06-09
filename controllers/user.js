const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');



const get = ( req = request, res = response ) => {
    res.json({
        ok: true,
        msg: 'get - user'
    })
}

const post = async( req = request, res = response ) => {

    const { name, email, password, role } = req.body;

    const user = new User( { name, email, password, role } )

    const emailExists = await User.findOne( { email } )

    if ( emailExists ) {
        return res.status(400).json({
            msg: 'Email already exists'
        })
    }

    const salt = bcryptjs.genSaltSync(10);

    user.password = bcryptjs.hashSync( password, salt );

    await user.save()

    res.json({
        user
    })

}

const put = ( req = request, res = response ) => {
    const id = req.params.id
    res.json({
        msg: 'put - user',  
        id
    })
}

const patch = ( req = request, res = response ) => {
    res.json({
        msg: 'patch - user'
    })
}

const delete_user = ( req = request, res = response ) => {
    res.json({
        msg: 'delete - user'
    })
}

module.exports = {
    get,
    post,
    put,
    patch,
    delete_user
}