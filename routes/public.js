const { Router } = require('express');

const router = Router();


router.get( '/chat', ( req, res ) => {
    res.sendFile( 'chat.html', { root: 'public'})
} );

module.exports = router;