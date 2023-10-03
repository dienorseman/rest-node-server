function loadPage() {
    const token = localStorage.getItem('token');
    if (token.length > 10) {
        document.getElementById('signout-google').style.display = 'block';
        console.log('token', token);
        location.href = 'chat';
    } else {
        document.getElementById('signout-google').style.display = 'none';
    }
}

window.onload = loadPage;

function handleCredentialResponse(response) {
    const credential = response.credential;
    // Send the credential to your server.
    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + credential,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const { tokenJWT } = data;
            console.log(tokenJWT);
            localStorage.setItem('token', tokenJWT);
            location.reload();
        })
        .catch((err) => console.log(err));
}

const signoutButton = document.getElementById('signout-google');

function signOut() {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), () => {
        localStorage.clear();
        location.reload();
    });
}

const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {};

    for (let el of loginForm.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    const url = 'http://localhost:8080/api/auth/login';

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem('token', data.token);
            location.href = 'chat';
        })
        .catch((err) => console.log(err));
});
