import pool from './db/db.js';
import correctPassword from './passwordWord.js';
import port from './public/tools/port.js';

import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dependencies for the app to read user input and to return JSONs.
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sends the app's HTML when they enter the main domain.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Runs the app on port PORT, so anyone can access on LAN on <IP Address>:<PORT>
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});

// Receives the SQL string from the app, then executes it and returns any errors.
app.post('/api/send', async (req, res) => {
    const { SQLstring } = req.body;
    const ret = {};
    try {
        await pool.execute(SQLstring);
    } catch (err) {
        ret.err = err;
    }
    res.json(ret);
});

// Receives the password from the user's input. Change PASSWORD to whatever you need.
app.post('/api/password', async (req, res) => {
    const { userInput } = req.body;
    /*
        Sends a JSON response containing the validity of the password. I wanted
        this server-side even though it's unlikely an operator will go
        through the code through the tablet to find the correct password.
    */ 
    res.json({ goodPassword: userInput === correctPassword });
});

app.post('/api/connection', async (req, res) => {
    const ret = {};
    try {
        await pool.query('SELECT * FROM qa1');
    } catch (err) {
        ret.err = err;
    }
    return res.json(ret);
});