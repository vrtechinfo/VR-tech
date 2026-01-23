import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

async function verifyAuthSetup() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('===== BETTER-AUTH DATABASE VERIFICATION =====\n');

        // Check user table
        const users = await pool.query('SELECT id, email, name FROM "user"');
        console.log('USERS:');
        users.rows.forEach(u => console.log(`  - ${u.email} (${u.name})`));

        // Check account table
        const accounts = await pool.query('SELECT id, "accountId", "providerId", "userId", password IS NOT NULL as has_password FROM account');
        console.log('\nACCOUNTS:');
        accounts.rows.forEach(a => console.log(`  - Provider: ${a.providerId}, HasPassword: ${a.has_password}, UserId: ${a.userId}`));

        // Check session table
        const sessions = await pool.query('SELECT id, token, "userId" FROM session LIMIT 5');
        console.log('\nSESSIONS:');
        if (sessions.rows.length === 0) {
            console.log('  No sessions yet (this is normal if no one has logged in)');
        } else {
            sessions.rows.forEach(s => console.log(`  - Session for user: ${s.userId}`));
        }

        // Test that we can find admin account
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vrtech.com';
        const adminAccount = await pool.query(`
            SELECT a.*, u.email 
            FROM account a 
            JOIN "user" u ON a."userId" = u.id 
            WHERE u.email = $1
        `, [adminEmail]);

        if (adminAccount.rows.length > 0) {
            console.log('\n✅ ADMIN ACCOUNT FOUND:');
            console.log(`   Provider: ${adminAccount.rows[0].providerId}`);
            console.log(`   Has Password: ${adminAccount.rows[0].password ? 'YES' : 'NO'}`);
        } else {
            console.log('\n❌ ADMIN ACCOUNT NOT FOUND IN ACCOUNT TABLE!');
        }

        console.log('\n===== ENVIRONMENT VARIABLES =====');
        console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ SET' : '❌ MISSING'}`);
        console.log(`BETTER_AUTH_SECRET: ${process.env.BETTER_AUTH_SECRET ? '✅ SET' : '❌ MISSING'}`);
        console.log(`NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL || '❌ MISSING'}`);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error);
        await pool.end();
        process.exit(1);
    }
}

verifyAuthSetup();
