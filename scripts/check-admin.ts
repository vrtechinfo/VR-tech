import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

async function checkAdmin() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Checking for admin user...\n');

        // Check all users
        const allUsers = await pool.query('SELECT id, name, email FROM "user"');

        console.log('=== ALL USERS IN DATABASE ===');
        allUsers.rows.forEach((user, index) => {
            console.log(`\n${index + 1}. User:`);
            console.log(`   ID: ${user.id}`);
            console.log(`   Name: ${user.name}`);
            console.log(`   Email: ${user.email}`);
        });

        console.log('\n\n=== EXPECTED ADMIN CREDENTIALS ===');
        console.log('Email: admin@vrtech.com');
        console.log('Password: vrpass@123');

        // Check if admin exists
        const adminUser = await pool.query(
            'SELECT * FROM "user" WHERE email = $1',
            ['admin@vrtech.com']
        );

        if (adminUser.rows.length > 0) {
            console.log('\n✅ Admin user EXISTS in database!');
            console.log('You can login with the credentials above.');
        } else {
            console.log('\n❌ Admin user NOT FOUND!');
            console.log('Run: npx tsx scripts/create-admin-db.ts');
        }

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await pool.end();
        process.exit(1);
    }
}

checkAdmin();
