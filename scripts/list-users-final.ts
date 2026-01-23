import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function listUsers() {
    try {
        const res = await pool.query('SELECT * FROM "user" WHERE email = $1', ['vradmin@vrtech.com']);
        if (res.rows.length > 0) {
            console.log("User EXISTS!");
        } else {
            console.log("User MISSING.");
        }
        await pool.end();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listUsers();
