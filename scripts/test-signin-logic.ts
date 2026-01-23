import dotenv from 'dotenv';
dotenv.config();

import { auth } from '../src/auth';

async function testSignIn() {
    console.log('Testing Better-Auth signInEmail logic directly...');

    try {
        const result = await auth.api.signInEmail({
            body: {
                email: 'admin@vrtech.com',
                password: 'vrpass@123'
            }
        });

        console.log('Sign-in result:', JSON.stringify(result, null, 2));
    } catch (error: any) {
        console.error('Sign-in FAILED with error:');
        console.error('Name:', error.name);
        console.error('Message:', error.message);
        if (error.stack) console.error('Stack:', error.stack);

        // Check for specific Better-Auth error details
        if (error.body) {
            console.error('Error Body:', JSON.stringify(error.body, null, 2));
        }
    }
}

testSignIn().then(() => process.exit());
