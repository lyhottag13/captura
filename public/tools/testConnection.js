export default async function testConnection() {
    try {
        const res = await fetch('/api/connection');
        const data = await res.json();
        if (!res.ok) {
            let err;
            if (data.err.errno === 1045) {
                err = 'Usuario o contraseña inválidos';
            } else if (data.err.errno === 1049) {
                err = 'Base de datos inválida';
            } else if (data.err.errno === -3008) {
                err = 'Dirección IP inválida';
            }
            console.log(data.err);
            return { err };
        }
        console.log('Connection successful.');
        return {};
    } catch (err) {
        return { err };
    }
}