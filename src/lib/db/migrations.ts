import { db } from './index';
import { Pool } from 'pg';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function createMigrationTable(): Promise<void> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } finally {
    await pool.end();
  }
}

export async function applyMigration(name: string, sql: string): Promise<void> {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Check if migration has already been applied
    const { rows } = await pool.query(
      'SELECT id FROM migrations WHERE name = $1',
      [name]
    );

    if (rows.length === 0) {
      // Apply the migration
      await pool.query(sql);

      // Record the migration
      await pool.query(
        'INSERT INTO migrations (name) VALUES ($1)',
        [name]
      );

      // Commit the transaction
      await pool.query('COMMIT');
      console.log(`Applied migration: ${name}`);
    } else {
      // Migration already applied
      await pool.query('ROLLBACK');
      console.log(`Migration already applied: ${name}`);
    }
  } catch (error) {
    // Rollback on error
    await pool.query('ROLLBACK');
    console.error(`Migration error: ${name}`, error);
    throw error;
  } finally {
    await pool.end();
  }
}

export async function runInitialMigration(): Promise<void> {
  await createMigrationTable();
  
  // Import the SQL to create tables
  const { createTablesSQL } = await import('./schema');
  
  await applyMigration('initial-schema', createTablesSQL);
}

// Helper function to create a new migration file
export async function createMigrationFile(description: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${timestamp}_${description.toLowerCase().replace(/\s+/g, '_')}.sql`;
  
  const migrationsDir = path.join(process.cwd(), 'migrations');
  
  // Ensure migrations directory exists
  await fs.mkdir(migrationsDir, { recursive: true });
  
  // Create empty migration file
  const migrationPath = path.join(migrationsDir, filename);
  await fs.writeFile(migrationPath, `-- Migration: ${description}\n\n-- Write your SQL here\n`);
  
  console.log(`Created migration file: ${migrationPath}`);
  return migrationPath;
}

// Function to run all pending migrations
export async function runAllMigrations(): Promise<void> {
  await createMigrationTable();
  
  const migrationsDir = path.join(process.cwd(), 'migrations');
  
  try {
    // Read all migration files
    const files = await fs.readdir(migrationsDir);
    const sqlFiles = files.filter(file => file.endsWith('.sql'));
    
    // Sort files by name (timestamp)
    sqlFiles.sort();
    
    // Apply each migration
    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, 'utf8');
      await applyMigration(file, sql);
    }
    
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Failed to run migrations:', error);
    throw error;
  }
}
