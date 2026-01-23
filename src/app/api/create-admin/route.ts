import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        // Check if any admin users already exist
        const existingAdmin = await db
            .selectFrom("user")
            .select("id")
            .where("role", "=", "admin")
            .executeTakeFirst();

        if (existingAdmin) {
            // Return styled HTML instead of JSON
            const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Setup Complete - VR Tech Info</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #000000;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
        }
        /* Background Ambience - matching sign-in page */
        .bg-ambience {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        .bg-glow-1 {
            position: absolute;
            top: -10%;
            left: -10%;
            width: 40%;
            height: 40%;
            background: rgba(127, 29, 29, 0.1);
            border-radius: 50%;
            filter: blur(120px);
        }
        .bg-glow-2 {
            position: absolute;
            bottom: -10%;
            right: -10%;
            width: 40%;
            height: 40%;
            background: rgba(39, 39, 42, 0.1);
            border-radius: 50%;
            filter: blur(100px);
        }
        .container {
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 16px;
            padding: 60px 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
            position: relative;
            z-index: 10;
        }
        .icon {
            width: 80px;
            height: 80px;
            background: rgba(34, 197, 94, 0.1);
            border: 2px solid rgba(34, 197, 94, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
        }
        .checkmark {
            width: 40px;
            height: 40px;
            border: 3px solid #22c55e;
            border-radius: 50%;
            position: relative;
        }
        .checkmark:after {
            content: '';
            position: absolute;
            left: 10px;
            top: 5px;
            width: 10px;
            height: 18px;
            border: solid #22c55e;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
        }
        h1 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        p {
            color: #a1a1aa;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: white;
            color: black;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            transition: all 0.2s;
        }
        .button:hover {
            background: #e5e5e5;
            transform: translateY(-1px);
        }
        .info-box {
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.2);
            border-radius: 12px;
            padding: 16px;
            margin-top: 30px;
            color: #fca5a5;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="bg-ambience">
        <div class="bg-glow-1"></div>
        <div class="bg-glow-2"></div>
    </div>
    
    <div class="container">
        <div class="icon">
            <div class="checkmark"></div>
        </div>
        
        <h1>Setup Complete</h1>
        <p>Admin account has already been created. This endpoint is now disabled for security purposes.</p>
        
        <a href="/sign-in" class="button">Go to Sign In</a>
        
        <div class="info-box">
            💡 If you need to create additional team members, please log in and visit the Team Management page.
        </div>
    </div>
</body>
</html>
            `;

            return new NextResponse(html, {
                headers: { "Content-Type": "text/html" },
            });
        }

        // Return HTML form for creating admin
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Admin Account - VR Tech Info</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0c16 0%, #1a1c2e 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        h1 {
            color: white;
            font-size: 32px;
            margin-bottom: 10px;
            text-align: center;
        }
        .subtitle {
            color: rgba(255, 255, 255, 0.6);
            text-align: center;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        input {
            width: 100%;
            padding: 14px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: white;
            font-size: 16px;
            transition: all 0.3s;
        }
        input:focus {
            outline: none;
            border-color: #dc2626;
            background: rgba(0, 0, 0, 0.4);
        }
        button {
            width: 100%;
            padding: 16px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
        }
        button:hover {
            background: #b91c1c;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        .message {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
        }
        .message.success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
        }
        .message.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }
        .warning {
            background: rgba(251, 191, 36, 0.1);
            border: 1px solid rgba(251, 191, 36, 0.3);
            color: #fbbf24;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Create Admin Account</h1>
        <p class="subtitle">Initial setup for VR Tech Info</p>
        
        <div class="warning">
            ⚠️ This endpoint will be disabled after the first admin is created.
        </div>

        <div id="message" class="message"></div>

        <form id="createAdminForm">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required placeholder="John Doe">
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="admin@vrtech.com">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="••••••••" minlength="8">
            </div>

            <button type="submit" id="submitBtn">Create Admin Account</button>
        </form>
    </div>

    <script>
        const form = document.getElementById('createAdminForm');
        const messageDiv = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating...';
            messageDiv.style.display = 'none';

            try {
                const response = await fetch('/api/create-admin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    messageDiv.className = 'message success';
                    messageDiv.textContent = result.message || 'Admin account created successfully!';
                    messageDiv.style.display = 'block';
                    form.reset();
                    
                    setTimeout(() => {
                        window.location.href = '/sign-in';
                    }, 2000);
                } else {
                    throw new Error(result.error || 'Failed to create admin');
                }
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = error.message;
                messageDiv.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Admin Account';
            }
        });
    </script>
</body>
</html>
        `;

        return new NextResponse(html, {
            headers: { "Content-Type": "text/html" },
        });
    } catch (error) {
        console.error("Error in create-admin GET:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Check if any admin users already exist
        const existingAdmin = await db
            .selectFrom("user")
            .select("id")
            .where("role", "=", "admin")
            .executeTakeFirst();

        if (existingAdmin) {
            return NextResponse.json(
                { error: "Admin user already exists. This endpoint is disabled." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        // Use Better-Auth's sign-up API to create the admin
        const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const response = await fetch(`${baseURL}/api/auth/sign-up/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create user');
        }

        const result = await response.json();
        const userId = result.user?.id;

        if (!userId) {
            throw new Error('User ID not returned from sign-up');
        }

        // Update the user to admin role
        await db
            .updateTable("user")
            .set({
                role: "admin",
                status: "active",
                emailVerified: true,
                updatedAt: new Date()
            })
            .where("id", "=", userId)
            .execute();

        return NextResponse.json({
            success: true,
            message: "Admin account created successfully! Redirecting to sign-in..."
        });
    } catch (error: any) {
        console.error("Error creating admin:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create admin account" },
            { status: 500 }
        );
    }
}
