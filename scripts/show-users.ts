import { db } from '../src/lib/db/index.js';
import dotenv from 'dotenv';
dotenv.config();

async function showUsers() {
    try {
        const users = await db.selectFrom('user').selectAll().execute();
        console.log('--- DB USERS ---');
        console.log(JSON.stringify(users, null, 2));
        console.log('----------------');
        process.exit(0);
    } catch (error) {
        console.error('Error listing users:', error);
        process.exit(1);
    }
}

showUsers();
