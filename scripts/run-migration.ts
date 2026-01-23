import { Pool } from 'pg';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

async function runMigration() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
    });

    try {
        console.log('🔄 Running database migration...');

        // Read the migration SQL file
        const migrationSQL = readFileSync(
            join(process.cwd(), 'migrations', '004_add_job_id_to_applications.sql'),
            'utf-8'
        );

        // Execute the migration
        await pool.query(migrationSQL);

        console.log('✅ Migration completed successfully!');
        console.log('\nNew fields added:');
        console.log('  - User table: role, status');
        console.log('  - Career applications: status, notes, reviewed_by, reviewed_at');
        console.log('  - Contact submissions: status, admin_reply, replied_by, replied_at');
        console.log('  - Job postings: status, publish_date, expiry_date');
        console.log('  - Indexes created for better performance');

        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        await pool.end();
        process.exit(1);
    }
}

runMigration();
