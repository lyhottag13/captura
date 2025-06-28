export default async function testConnection() {
    const res = await fetch('/api/connection', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    const data = await res.json();
    if (data.err) {
        let errorCause;
        if (data.err.errno === 1045) {
            errorCause = 'Usuario o contraseña inválidos';
        } else if (data.err.errno === 1049) {
            errorCause = 'Base de datos inválida';
        } else if (data.err.errno === -3008) {
            errorCause = 'Dirección IP inválida';
        }
        window.alert(`Error de conexión:
            ${data.err.code}
            ${errorCause}`);
    } else {
        console.log('Connection successful.');
    }
}