import { createPool } from 'mysql2/promise';
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Leo!2025',
    database: 'sys',
});
export default pool;