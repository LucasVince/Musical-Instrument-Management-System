const userInput = document.querySelector('#UserInput');
const passwordInput = document.querySelector('#PasswordlInput');

const loginForm = document.querySelector('#loginForm');

const singIn = async event => {
    event.preventDefault();

    const username = userInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { username, password } )
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('login done sucessfully');
        console.log('login done sucessfully');
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}

loginForm.addEventListener('submit', singIn);