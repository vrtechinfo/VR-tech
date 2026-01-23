import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Testing database connection...');
        console.log('DATABASE_URL:', process.env.DATABASE_URL);

        const result = await pool.query('SELECT NOW()');
        console.log('✅ Database connection successful!');
        console.log('Current time from DB:', result.rows[0].now);

        // Test if user table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'user'
            );
        `);
        console.log('User table exists:', tableCheck.rows[0].exists);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        await pool.end();
        process.exit(1);
    }
}

testConnection();
