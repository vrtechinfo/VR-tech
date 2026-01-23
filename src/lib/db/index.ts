import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './schema';

// Create a PostgreSQL connection pool
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }),
});

// Initialize Kysely with the dialect and database schema
export const db = new Kysely<Database>({
  dialect,
});

// Initialize the database by creating necessary tables
export async function initializeDatabase(): Promise<void> {
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    // Import the SQL to create tables
    const { createTablesSQL } = await import('./schema');

    // Execute the SQL to create tables if they don't exist
    await pool.query(createTablesSQL);
    console.log('Database tables initialized');

    // Release the pool
    await pool.end();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
