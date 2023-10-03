const usernamelbl = document.querySelector('#username');

const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulMessages = document.querySelector('#ulMessages');
const ulUsers = document.querySelector('#ulUsers');
const logoutBtn = document.querySelector('#logoutBtn');

let socket = null;

const validateJWT = async () => {

    const token = localStorage.getItem( 'token' )

    if (!token || token.length <= 10) {
        location.href = 'index.html'
        throw new Error('No hay token')
    }

    const resp = await fetch('http://localhost:8080/api/auth/', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })

    if (resp.status !== 200) {
        location.href = 'index.html';
        localStorage.clear();
        throw new Error('Token no válido');
    }

    const { user, newToken } = await resp.json();

    localStorage.setItem( 'token', newToken )

    usernamelbl.innerHTML = user.name
};

const socketConnect = async() => {
    socket = io( { 
        'extraHeaders': {
            'Authorization': 'Bearer ' + localStorage.getItem( 'token' )
        }
     } );
    
    socket.on('receive-messages', (payload) => {
        renderMessages( payload );
    });

    socket.on('active-users', ( payload ) => {
        renderUsers( payload );
    });

    socket.on('private-message', ( payload ) => {
        console.log( 'Privado:', payload );

    });
}

logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

const renderUsers = ( users = [] ) => {
    let usersHtml = '';
    users.forEach( ({ name, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${ name }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    });
    ulUsers.innerHTML = usersHtml;
}


const renderMessages = ( messages = [] ) => {

    let messagesHtml = '';
    messages.forEach( ({ name, message }) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${ name }</span>
                    <span>${ message }</span>
                </p>
            </li>
        `;
    });
    ulMessages.innerHTML = messagesHtml;
}


txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const message = txtMessage.value;
    const uid = txtUid.value;

    if (keyCode !== 13) { return; }
    if (message.length === 0) { return; }

    socket.emit('send-message', {
        message,
        uid,
    });

    txtMessage.value = '';
});

const main = async () => {
    await validateJWT();
    socketConnect();
};

main();

