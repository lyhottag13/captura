const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const PORT = 80;

let pool;

createConnection();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1 id="header"></h1>
        <form method="post" action="/submit">
            <input name="username" placeholder="Enter your name" />
            <button type="submit">Send</button>
        </form>
        <script>
            const header = document.getElementById("header");    
            setInterval(() => {
                header.innerHTML = Date().;
            }, 1000);
        </script>
        `);
});
app.get('/cool', (req, res) => {
    res.send(`
        <h1>Hi!</h1>
        `);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.post('/submit', (req, res) => {
    res.send(`Thank you! I have your info now. Your name is ${req.body.username}
        <br>
        <a href="/">Return</a>
        `);
    insert(req.body.username);
});
function createConnection() {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Leo!2025',
        database: 'sys',
    });
}

async function insert(name) {
    pool.execute(`INSERT INTO names (name) VALUES ('${name}')`);
    console.log(name);
}
