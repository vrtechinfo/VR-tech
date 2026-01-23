import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Validate required environment variables
if (!process.env.DATABASE_URL) {
   throw new Error('DATABASE_URL environment variable is not set');
}

if (!process.env.BETTER_AUTH_SECRET) {
   console.warn('BETTER_AUTH_SECRET environment variable is not set. Using a random secret.');
}

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
   // Add connection error logging
   idleErrorHandler: (error) => {
      console.error('Database idle error:', error);
   }
});

// Test the pool connection
pool.on('error', (err) => {
   console.error('Database pool error:', err);
});

console.log('Initializing Better-Auth with:');
console.log('- DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
console.log('- NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('- NODE_ENV:', process.env.NODE_ENV);

export const auth = betterAuth({
   database: pool,
   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
   secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-for-development",
   emailAndPassword: {
      enabled: true
   },
   // Enable logging for debugging
   debug: process.env.NODE_ENV === 'development'
});
