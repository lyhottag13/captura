const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form method="Post" action="/submit">
            <input name="username" placeholder="Enter your name" />
            <button type="submit">Send</button>
        </form>
        `);
});
app.get('/cool', (req, res) => {
    res.send('<h1>Hi!</h1>');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.post('/submit', (req, res) => {
    res.send(`Thank you! I have your info now. Your name is ${req.body.username}`);
});
async function main() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Leo!2025',
        database: 'sys',
    });

    try {
        const [results] = await pool.query('SELECT * FROM breville2');
        results.forEach((row) => {
            let rowString = "(";
            for (const item in row) {
                try {
                    rowString = rowString + ", " + row[item].substring(0, 2);
                } catch (e) {

                }
            };
            console.log(rowString + ")");
        })
    } catch (e) {
        console.log(e);
    }

}
main();
