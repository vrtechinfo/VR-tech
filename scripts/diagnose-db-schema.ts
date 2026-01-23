import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

async function diagnoseDB() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Testing direct PG query...');
        const res = await pool.query('SELECT current_database(), current_user');
        console.log('Database connected:', res.rows[0]);

        console.log('\nChecking table definitions...');
        const tables = ['user', 'session', 'account', 'verification'];
        for (const table of tables) {
            const columns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
                ORDER BY ordinal_position
            `);
            console.log(`\nTable: ${table}`);
            columns.rows.forEach(c => console.log(`  - ${c.column_name}: ${c.data_type}`));
        }

        await pool.end();
    } catch (error) {
        console.error('DB Diagnosis FAILED:', error);
    }
}

diagnoseDB();
