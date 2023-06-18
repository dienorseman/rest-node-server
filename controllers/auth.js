const { request, response } = require('express');

const bcryptjs = require('bcryptjs');

// jwt
const { generateJWT } = require('../helpers/generate-jwt');

const User = require('../models/user');


const post = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // check if email exists
        const user = await User.findOne( { email } );

        if ( !user ) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // check if user is active
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // check if password is correct
        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Email or password is incorrect'
            })
        }

        // generate JWT
        const token = await generateJWT( user.id );



        res.json({
            msg: `Welcome ${user.name}!`,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        }) 
    }

}   


    module.exports = {
        post
    }