import { pool } from './db/db.js';
import password from './passwordWord.js';

import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dependencies for the app to read user input and to return JSON.
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sends the app's HTML when they enter the main domain.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Runs the app on port PORT.
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
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
    const { password: userInput } = req.body;
    if (userInput === password) {
        // Returns a JSON file that states, this password is good.
        res.json({ goodPassword: true });
    } else {
        res.json({ goodPassword: false });
    }
});