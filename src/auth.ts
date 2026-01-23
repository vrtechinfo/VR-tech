import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
   database: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
   }),
   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
   secret: process.env.BETTER_AUTH_SECRET,
   emailAndPassword: {
      enabled: true
   }
});