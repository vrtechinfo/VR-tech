import { initializeDatabase } from '../src/lib/db';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Initializing database...');
console.log('Database URL:', process.env.DATABASE_URL);

async function main() {
    try {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });

        console.log("Dropping Auth Tables...");
        await pool.query(`
            DROP TABLE IF EXISTS "session" CASCADE;
            DROP TABLE IF EXISTS "account" CASCADE;
            DROP TABLE IF EXISTS "verification" CASCADE;
            DROP TABLE IF EXISTS "user" CASCADE;
        `);
        await pool.end();

        console.log("Re-creating tables...");
        await initializeDatabase();
        console.log('Database initialization completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

main();
