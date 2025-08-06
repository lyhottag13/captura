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

// Runs the app on port PORT.
app.listen(port, '127.0.0.1', () => {
    console.log(`Captura listening on port ${port}`);
});

// Receives the SQL string properties from the app, creates the SQLstring, then executes it.
app.post('/api/inspection', async (req, res) => {
    /** @type {{id: string, checkPanels: CheckPanel[], notes: string}} */
    const { id, checkPanels, notes } = req.body;

    const columns = ['id'];
    const placeholders = ['?'];
    /* 
    Builds the SQL string dynamically, so that we can handle 10, 20, or 50 checks.
    The sequence for the string goes (id, check1, check2, ... , check n, notes).
    They're all VARCHAR except for the checks. 
    Sidenote, there's no possibility for SQL injection, since the user can't
    directly input into the SQL string, but it's still good practice to use
    parameterized queries.
    */
    // Inserts s1, s2, ..., s51, s52. Also adds a new ? for each column.
    checkPanels.forEach((_, i) => {
        columns.push(`s${i + 1}`);
        placeholders.push('?');
    });

    // Adds two more columns for the notes and fecha.
    columns.push('notes', 'fecha');
    placeholders.push('?', '?');

    // Creates an array of 1/0 (or PASS/FAIL) based on checkPanels.
    const passOrFails = checkPanels.map(panel => panel.pass ? 1 : 0);

    const now = new Date();
    const datetime = `${now.toLocaleDateString('en-CA')} ${now.toLocaleTimeString('en-CA', { hour12: false })}`;

    // Builds the SQL query based on the columns and placeholders created.
    const SQLString = `INSERT INTO qa1 (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`;
    const values = [
        id,
        ...passOrFails,
        notes,
        datetime,
    ];
    try {
        const [response] = await pool.execute(SQLString, values);
        console.log(response);
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});

// Receives the password from the user's input. Change PASSWORD to whatever you need.
app.post('/api/password', async (req, res) => {
    /** @type {{password: string}} */
    const { password } = req.body;
    const goodPassword = password === correctPassword;
    /*
    Sends a JSON response containing the validity of the password. I wanted
    this server-side even though it's unlikely an operator will go
    through the code on the tablet to find the correct password.
    */
    res.status(goodPassword ? 200 : 400).json({ goodPassword });
});

app.get('/api/connection', async (_req, res) => {
    try {
        await pool.query('SELECT 1');
        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({ err });
    }
});