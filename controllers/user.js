const { request, response } = require('express')

const get = ( req = request, res = response ) => {
    res.json({
        ok: true,
        msg: 'get - user'
    })
}

const post = ( req = request, res = response ) => {
    const { name, age } = req.body;

    res.json({
        msg: 'post - user',
        user: {
            name,
            age
        }
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