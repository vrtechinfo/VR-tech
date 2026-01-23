import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

async function checkBetterAuthTables() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Checking Better-Auth required tables...\n');

        // Check for required tables
        const requiredTables = ['user', 'session', 'account', 'verification'];

        for (const tableName of requiredTables) {
            const result = await pool.query(
                `SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = $1
                );`,
                [tableName]
            );

            const exists = result.rows[0].exists;
            console.log(`${exists ? '✅' : '❌'} Table "${tableName}": ${exists ? 'EXISTS' : 'MISSING'}`);
        }

        console.log('\n--- Checking table structures ---\n');

        // Check user table structure
        const userColumns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user'
            ORDER BY ordinal_position;
        `);

        console.log('User table columns:');
        userColumns.rows.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type}`);
        });

        // Check account table structure
        const accountCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'account'
            );
        `);

        if (accountCheck.rows[0].exists) {
            const accountColumns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'account'
                ORDER BY ordinal_position;
            `);

            console.log('\nAccount table columns:');
            accountColumns.rows.forEach(col => {
                console.log(`  - ${col.column_name}: ${col.data_type}`);
            });
        }

        // Check session table
        const sessionCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'session'
            );
        `);

        if (sessionCheck.rows[0].exists) {
            const sessionColumns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'session'
                ORDER BY ordinal_position;
            `);

            console.log('\nSession table columns:');
            sessionColumns.rows.forEach(col => {
                console.log(`  - ${col.column_name}: ${col.data_type}`);
            });
        }

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await pool.end();
        process.exit(1);
    }
}

checkBetterAuthTables();
