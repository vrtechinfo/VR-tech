import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// This is a debug endpoint to test authentication
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        console.log('Testing auth for:', email);

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        // Find user
        const userResult = await pool.query(
            'SELECT * FROM "user" WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            await pool.end();
            return NextResponse.json({ error: 'User not found', email }, { status: 404 });
        }

        const user = userResult.rows[0];
        console.log('Found user:', user.id, user.name);

        // Find account  
        const accountResult = await pool.query(
            'SELECT * FROM account WHERE "userId" = $1 AND "providerId" = $2',
            [user.id, 'credential']
        );

        if (accountResult.rows.length === 0) {
            await pool.end();
            return NextResponse.json({
                error: 'No credential account found',
                userId: user.id
            }, { status: 404 });
        }

        const account = accountResult.rows[0];
        console.log('Found account:', account.id, 'HasPassword:', !!account.password);

        if (!account.password) {
            await pool.end();
            return NextResponse.json({
                error: 'Account has no password set',
                accountId: account.id
            }, { status: 400 });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, account.password);

        await pool.end();

        if (passwordMatch) {
            return NextResponse.json({
                success: true,
                message: 'Password is correct!',
                user: { id: user.id, email: user.email, name: user.name }
            });
        } else {
            return NextResponse.json({
                success: false,
                error: 'Invalid password'
            }, { status: 401 });
        }

    } catch (error: any) {
        console.error('Debug auth error:', error);
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
