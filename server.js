import { pool } from './db/db.js';

import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

main();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.post('/submit', (req, res) => {
    if (req.body.username !== "") {
        res.send(`
            Thank you! I have your info now. Your name is ${req.body.username}.
            <br>
            <a href="/">Submit more.</a>
            <a href="/data">See data.</a>
        `);
        insert(req.body.username);
    } else {
        res.send(`
            Thank you! We'll delete that id now. The id to delete is ${req.body.index}.
            <br>
            <a href="/">Submit more.</a>
            <a href="/data">See data.</a>
        `);
        remove(req.body.index);
    }
});


async function insert(name) {
    pool.execute(`INSERT INTO names (name, time) VALUES ('${name}', '${new Date().toLocaleString()}')`);
    console.log(name);
}
async function remove(index) {
    pool.execute(`DELETE FROM names WHERE id = ${index}`);
}

app.get('/data', async (req, res) => {
    const [results] = await pool.query('SELECT * FROM names');
    let output = '';
    results.forEach(element => {
        output += `id: ${element.id}, name: ${element.name}, time: ${element.time}<br>`;
    });
    res.send(`
        <!DOCTYPE html>

        <body>
            Here is the data:<br><br>${output}<br><br>
            <a href="/">Submit more?</a>
        </body>
    `);
});
async function main() {
}

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

app.post('/api/send', (req, res) => {
    const { output } = req.body;
    console.log(output);
    try {
        pool.execute(output);
    } catch (err) {
        console.log(err);
    }
    res.json({query: output});
})