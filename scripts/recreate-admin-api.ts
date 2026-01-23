import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { auth } from '../src/auth';

async function recreateAdmin() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Deleting existing admin user...');
        const email = 'admin@vrtech.com';

        // Delete in order to satisfy foreign keys
        await pool.query('DELETE FROM session WHERE "userId" IN (SELECT id FROM "user" WHERE email = $1)', [email]);
        await pool.query('DELETE FROM account WHERE "userId" IN (SELECT id FROM "user" WHERE email = $1)', [email]);
        await pool.query('DELETE FROM "user" WHERE email = $1', [email]);

        console.log('Admin user deleted. Now creating via Better-Auth API...');

        const result = await auth.api.signUpEmail({
            body: {
                email: email,
                password: 'vrpass@123',
                name: 'VR Tech Admin'
            }
        });

        console.log('SignUp result:', JSON.stringify(result, null, 2));

        await pool.end();
        console.log('\nSuccess! Admin user recreated via Official API.');
    } catch (error: any) {
        console.error('Recreation FAILED:', error.message);
        if (error.stack) console.error(error.stack);
        await pool.end();
        process.exit(1);
    }
}

recreateAdmin();
