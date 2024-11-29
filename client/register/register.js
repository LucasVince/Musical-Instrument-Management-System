const userInput = document.querySelector('#UserInput');
const emailInput = document.querySelector('#EmailInput');
const passwordInput = document.querySelector('#PasswordInput');

const registerForm = document.querySelector('#RegisterForm');

const singUp = async event => {
    event.preventDefault();

    const username = userInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {username, email, password} )
        });

        const data = response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert('User registered successfully');
        console.log('User registered successfully');
    } catch (err) {
        alert(err.message);
        console.log(err.message);
    }
}

registerForm.addEventListener('submit', singUp);