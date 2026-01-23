import dotenv from 'dotenv';
dotenv.config();

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// I need to use the same config as src/auth.ts
// But src/auth.ts imports 'next/server' maybe?
// Let's look at src/auth.ts first.
// If it has nextjs deps, I might need to mock them or just copy the config.

// Let's assume I can import it.
import { auth } from "../src/auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@vrtech.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vrpass@123";
const ADMIN_NAME = process.env.ADMIN_NAME || "VR Tech Admin";

async function main() {
    try {
        console.log("Creating user direct...");
        const user = await auth.api.signUpEmail({
            body: {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                name: ADMIN_NAME
            }
        });
        console.log("Success:", user);
    } catch (e) {
        console.error("Direct creation failed:", e);
    }
}
main();
