import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
    const diagnostics: any = {
        timestamp: new Date().toISOString(),
        environment: {
            nodeEnv: process.env.NODE_ENV,
            nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
            databaseUrl: process.env.DATABASE_URL ? '✓ Set' : '✗ Missing',
            betterAuthSecret: process.env.BETTER_AUTH_SECRET ? '✓ Set' : '✗ Missing'
        },
        database: {
            connected: false,
            error: null,
            tables: [] as string[]
        },
        auth: {
            tablesExist: false,
            usersCount: 0,
            error: null
        }
    };

    try {
        // Test database connection
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });

        try {
            const testConnection = await pool.query('SELECT NOW()');
            diagnostics.database.connected = true;
            console.log('✓ Database connection successful');

            // Check if auth tables exist
            const tablesResult = await pool.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                AND table_name IN ('user', 'account', 'session', 'verification')
            `);

            diagnostics.database.tables = tablesResult.rows.map(r => r.table_name);
            diagnostics.auth.tablesExist = tablesResult.rows.length === 4;

            if (diagnostics.auth.tablesExist) {
                console.log('✓ All required auth tables exist');

                // Check users count
                const usersResult = await pool.query('SELECT COUNT(*) as count FROM "user"');
                diagnostics.auth.usersCount = parseInt(usersResult.rows[0].count);

                // Get admin users
                const adminsResult = await pool.query(`
                    SELECT id, email, name FROM "user" LIMIT 5
                `);
                (diagnostics.auth as any).users = adminsResult.rows.map(u => ({
                    id: u.id,
                    email: u.email,
                    name: u.name
                }));

                console.log(`✓ Found ${diagnostics.auth.usersCount} users in database`);
            } else {
                console.warn('✗ Missing auth tables:', diagnostics.database.tables);
                diagnostics.auth.error = `Missing tables. Found: ${diagnostics.database.tables.join(', ')}`;
            }
        } catch (error: any) {
            diagnostics.database.error = error?.message;
            diagnostics.auth.error = `Database query error: ${error?.message}`;
            console.error('✗ Database error:', error);
        } finally {
            await pool.end();
        }
    } catch (error: any) {
        console.error('✗ Connection error:', error);
        diagnostics.database.error = error?.message || 'Unknown error';
        diagnostics.auth.error = `Connection error: ${error?.message || 'Unknown'}`;
    }

    return NextResponse.json(diagnostics);
}
