import dotenv from 'dotenv';
dotenv.config();

import { auth } from "../src/auth";

async function updateAdminPassword() {
    const email = process.env.ADMIN_EMAIL || "admin@vrtechinfo.com";
    const newPassword = process.env.ADMIN_PASSWORD || "VRTech@Admin2024!";

    try {
        console.log(`Updating password for: ${email}`);

        // Note: better-auth doesn't have a direct password update API
        // You'll need to implement this based on your auth setup
        // This is a placeholder for the logic

        console.log("⚠️  Password update requires manual database update or user password reset flow");
        console.log("For security reasons, use the password reset feature in the application");

    } catch (e) {
        console.error("Password update failed:", e);
    }
}

updateAdminPassword();
