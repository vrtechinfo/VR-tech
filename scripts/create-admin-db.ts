import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { randomUUID } from 'crypto';

async function createAdminDirectDB() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const email = process.env.ADMIN_EMAIL || "admin@vrtech.com";
        const password = process.env.ADMIN_PASSWORD || "vrpass@123";
        const name = process.env.ADMIN_NAME || "VR Tech Admin";

        console.log('Creating admin user directly in database...');
        console.log('Email:', email);

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT * FROM "user" WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            console.log('❌ User already exists!');
            console.log('User ID:', existingUser.rows[0].id);
            await pool.end();
            process.exit(1);
        }

        // Create user ID
        const userId = randomUUID();
        const now = new Date();

        // Insert user
        await pool.query(
            `INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, name, email, false, now, now]
        );

        console.log('✅ User created successfully!');
        console.log('User ID:', userId);

        // Create account with password
        // Note: better-auth uses bcrypt for password hashing
        // We need to hash the password properly
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10);

        const accountId = randomUUID();
        await pool.query(
            `INSERT INTO account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [accountId, email, 'credential', userId, hashedPassword, now, now]
        );

        console.log('✅ Account created with hashed password!');
        console.log('Account ID:', accountId);
        console.log('\n🎉 Admin user created successfully!');
        console.log('You can now login with:');
        console.log('Email:', email);
        console.log('Password:', password);

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        await pool.end();
        process.exit(1);
    }
}

createAdminDirectDB();
