export const hidePassword = () => {
    document.getElementById('passwordDiv').remove();
}
export async function submitPassword(password) {
    const res = await fetch('/api/password', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    });
    const data = await res.json();
    const { goodPassword } = data;
    return goodPassword;
}
export function initializePasswordQuery(handleSubmit) {
    const passwordDiv = document.createElement('div');
    passwordDiv.id = 'passwordDiv';
    passwordDiv.innerText = 'Ingresa contraseña';
    const passwordField = document.createElement('input');
    passwordField.id = 'passwordField';
    passwordField.type = 'password';
    const passwordSubmit = document.createElement('button');
    passwordSubmit.innerText = 'Enviar';
    passwordSubmit.addEventListener('click', () => {
        handleSubmit(passwordField.value);
    })
    passwordField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleSubmit(passwordField.value);
        }
        console.log('cool');
    })
    passwordDiv.appendChild(passwordField);
    passwordDiv.appendChild(passwordSubmit);
    document.body.appendChild(passwordDiv);
}