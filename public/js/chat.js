const usernamelbl = document.querySelector('#username');

const validateJWT = async () => {

    const token = localStorage.getItem( 'token' )

    if ( token == null || token == undefined ) {
        window.location = '/'
        throw new Error('No hay token')
    }

    const resp = await fetch('http://localhost:8080/api/auth/', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })

    const { user, newToken } = await resp.json();

    localStorage.setItem( 'token', newToken )

    usernamelbl.innerHTML = user.name
};

const socketConnect = async() => {
    const socket = io( { 
        'extraHeaders': {
            'Authorization': 'Bearer ' + localStorage.getItem( 'token' )
        }
     } );

}

const main = async () => {
    validateJWT()
    socketConnect()
};

main()

