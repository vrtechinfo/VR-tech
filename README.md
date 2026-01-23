# VR Tech Info | IT Consulting & Technology Solutions

![VR Tech Info Banner](https://site-assets.fontawesome.com/releases/v6.4.2/css/all.css) 


A modern, high-performance web platform for **VR Tech Info**, built with **Next.js 15**, **PostgreSQL**, and **Better-Auth**. This project features a full recruitment system, contact management, and a robust administrative dashboard.

## 🚀 Features

### Frontend (Client-Facing)
- **Modern UI/UX**: Built with Tailwind CSS 4, Shadcn UI, and Framer Motion for smooth animations.
- **Immersive 3D Experience**: High-performance Three.js background using **WebGPU/WebGL** for realistic bloom and interactive scanning effects.
- **Service Catalog**: Detailed breakdown of IT consulting, Cybersecurity, and Training services.
- **Advanced Recruitment Display**: Smart visibility logic that shows both active and inactive roles, with status indicators and recruitment locks.
- **Job-Specific Applications**: Dedicated `/careers/apply?jobId=...` route for pinpoint recruitment.
- **Resume Management**: Integrated resume upload system powered by Cloudflare R2.
- **Low-Latency Rendering**: Hardware-accelerated animations and optimized image pipeline for 60fps+ performance.

### Backend & Admin (Internal)
- **Secure Authentication**: Robust auth system using **Better-Auth** with session management.
- **Admin Dashboard**:
  - **Candidate Management**: View candidates with specific job titles and direct resume access.
  - **Message Center**: Manage and reply to contact form submissions.
  - **Job Manager**: Dynamic job role management with real-time status toggles.
  - **Team Management**: Robust system for creating, deactivating, and removing admin team members.
- **Database Architecture**: Type-safe queries using **Kysely** and **PostgreSQL**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **3D Rendering** | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) |
| **Auth** | [Better-Auth](https://www.better-auth.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM/Query Builder** | [Kysely](https://kysely.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Storage** | [Cloudflare R2](https://www.cloudflare.com/products/r2/) (S3 Compatible) |

---

## 🔌 API Endpoints

### Authentication Endpoints (Better-Auth)

| Endpoint | Method | Description | Access |
|---|---|---|---|
| `/api/auth/sign-in/email` | POST | Sign in with email and password | Public |
| `/api/auth/sign-up/email` | POST | Create new user account | Public |
| `/api/auth/sign-out` | POST | Sign out current user | Authenticated |
| `/api/auth/get-session` | GET | Get current session details | Public |
| `/api/auth/[...all]` | * | Better-Auth catch-all handler | Public |

**Example Sign-In Request:**
```bash
curl -X POST http://localhost:3000/api/auth/sign-in/email \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@vrtech.com", "password": "your-password"}'
```

### Admin & Setup Endpoints

| Endpoint | Method | Description | Access |
|---|---|---|---|
| `/api/create-admin` | GET | Display admin creation form | Public (disabled after first admin) |
| `/api/create-admin` | POST | Create initial admin account | Public (disabled after first admin) |
| `/api/init-db` | GET | Initialize database schema | Public (production setup) |

**Create Admin Example:**
```bash
curl -X POST http://localhost:3000/api/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin User", "email": "admin@vrtech.com", "password": "securepass123"}'
```

### Debug & Utility Endpoints

| Endpoint | Method | Description | Access |
|---|---|---|---|
| `/api/debug-auth` | POST | Debug authentication issues | Development only |
| `/debug` | GET | Team member account debugging tool | Development only |

**Note:** Debug endpoints should be disabled or protected in production environments.

### Server Actions (Internal API)

These are Next.js Server Actions called from the frontend:

**Admin Actions** (`/app/actions/admin-actions.ts`):
- `createTeamMember()` - Create new team member
- `updateTeamMember()` - Update team member details
- `deleteTeamMember()` - Remove team member
- `getDashboardStats()` - Get admin dashboard statistics
- `getAllApplications()` - Fetch all job applications
- `updateApplicationStatus()` - Update application status
- `updateApplicationNotes()` - Add notes to application

**Job Actions** (`/app/actions/job-actions.ts`):
- `getAllJobs()` - Fetch all job postings
- `createJob()` - Create new job posting
- `updateJob()` - Update job posting
- `deleteJob()` - Remove job posting

**Form Actions** (`/app/actions/form-actions.ts`):
- `submitContactForm()` - Handle contact form submissions
- `submitCareerApplication()` - Handle job applications with resume upload

**Message Actions** (`/app/actions/message-actions.ts`):
- `getAllMessages()` - Fetch all contact messages
- `replyToMessage()` - Reply to contact inquiry

---

## 🏗️ System Architecture & Data Flow

### Logic Block Diagram
```mermaid
graph LR
    subgraph "Frontend Layer"
        UI[React Components]
        SA[Next.js Server Actions]
        MW[Auth Middleware]
    end

    subgraph "Service Layer"
        Auth[Better Auth]
        Kysely[Kysely Query Builder]
        R2_Client[S3/R2 Client]
    end

    subgraph "Data Layer"
        Postgres[(PostgreSQL Render)]
        R2_Storage[Cloudflare R2 Storage]
    end

    UI --> MW
    MW --> SA
    SA --> Auth
    SA --> Kysely
    SA --> R2_Client
    Kysely --> Postgres
    R2_Client --> R2_Storage
```

### 🔄 User Flow Diagram
```mermaid
sequenceDiagram
    participant User
    participant NextJS
    participant Auth
    participant DB
    participant R2

    User->>NextJS: Select Job & Apply
    Note over NextJS: Route: /careers/apply?jobId=X
    NextJS->>Auth: Check Session/Rate Limit
    Auth-->>NextJS: OK
    Note over NextJS: Handle File (R2)
    NextJS->>R2: Upload Resume
    R2-->>NextJS: Return URL
    NextJS->>DB: Save Application(Kysely) + JobID
    DB-->>NextJS: Success
    NextJS-->>User: Show "Thank You"
```

### 📂 Project Structure (Schematic)
```text
vr-tech-info/
├── scripts/                # Database maintenance & CLI tools
│   ├── init-db.ts          # Schema initialization
│   └── run-migration.ts    # Manual SQL migrations
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   │   ├── (admin)/        # Admin layout & sensitive routes
│   │   ├── (rootpages)/    # Public marketing pages
│   │   │   └── careers/
│   │   │       └── apply/  # Job-specific application page
│   │   ├── actions/        # Server Actions (Business Logic)
│   │   └── api/            # API Endpoints (Auth, Webhooks)
│   ├── components/         # Reusable UI Components
│   │   ├── admin/          # Dashboard-specific components
│   │   └── ui/             # Base Shadcn components
│   ├── lib/
│   │   ├── db/             # Kysely Instance & SQL Schemas
│   │   └── utils/          # Storage & Rate-limiting helpers
│   ├── auth.ts             # Better-Auth Main Configuration
│   └── middleware.ts       # Route Guards & Session Protection
├── Dockerfile              # Production Multi-stage Build
├── docker-compose.yml      # Local Dev Environment
└── next.config.ts          # Build & Standalone Optimization
```

---

## 💻 Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (Recommended)
- [Pnpm](https://pnpm.io/) or NPM

### Setup with Docker (Easiest)
1. Clone the repository: `git clone <repo-url>`
2. Copy the example env: `cp .env.docker.example .env`
3. Start the services:
   ```bash
   docker-compose up -d
   ```
4. Install local dependencies: `npm install`
5. Initialize the database:
   ```bash
   npm run db:init
   ```
6. Run the dev server: `npm run dev`

### Environment Variables
Create a `.env` file in the root:
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/vr_tech_db

# Auth
BETTER_AUTH_SECRET=your_random_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Storage (Cloudflare R2)
CLOUDFLARE_R2_ENDPOINT=https://<id>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=...
```

---

## 🗄️ Database Management (pgAdmin)

The project includes an optional **pgAdmin** GUI tool for visual database management.

### 1. Start pgAdmin
Run the following command to start the management tool:
```bash
docker-compose --profile tools up -d
```

### 2. Login Details
Access the dashboard at **[http://localhost:5050](http://localhost:5050)** (or `http://127.0.0.1:5050`).
- **Email**: `admin@vrtechinfo.com` (Check your `.env`)
- **Password**: `vrpass@123` (Check your `.env`)

### 3. Connect to VR Tech Database
To see your data, you must register the server inside pgAdmin:
1. Click **Add New Server**.
2. **General Tab**: Name it `VR Tech Info`.
3. **Connection Tab**:
   - **Host**: `postgres` (internal Docker hostname)
   - **Port**: `5432`
   - **Database**: `vr_tech_db`
   - **Username**: `postgres`
   - **Password**: `password` (from your `.env`)
4. Click **Save**.

### 4. Exploring Tables
Navigate to: `Servers > VR Tech Info > Databases > vr_tech_db > Schemas > public > Tables`
- **`job_roles`**: Manage recruitment listings.
- **`applications`**: View candidate submissions and resume references.
- **`contact_messages`**: Review website inquiries.

---

## ☁️ Deployment Guide

### Production Setup Flow

Follow these steps to deploy VR Tech Info to production:

#### Step 1: Deploy Application to Netlify/Vercel
1. **Push code to GitHub** (if not already done)
2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Import from Git"
   - Select your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next` (auto-detected)

#### Step 2: Create PostgreSQL Database on Render
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL**
3. Configure:
   - **Name**: `vr-tech-db`
   - **Database**: `vr_tech_info`
   - **Plan**: Free or preferred tier
4. **Copy the External Connection String** (you'll need this next)

#### Step 3: Add Environment Variables
In your Netlify dashboard, go to **Site settings** → **Environment variables** and add:

```env
# Database
DATABASE_URL=postgresql://user:password@hostname/dbname?sslmode=require

# Authentication
BETTER_AUTH_SECRET=your_random_32_character_secret_here
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app

# Storage (Cloudflare R2)
CLOUDFLARE_R2_ENDPOINT=https://<id>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=your_bucket_name

# Site URL
SITE_URL=https://your-site.netlify.app
```

#### Step 4: Initialize Database Schema
Once deployed, visit (one time only):
```
https://your-domain.com/api/init-db
```
This creates all necessary tables in your database.

#### Step 5: Create First Admin Account
Visit (one time only):
```
https://your-domain.com/api/create-admin
```
Fill in the form to create your admin account. This endpoint automatically disables itself after the first admin is created.

#### Step 6: Start Using the App!
1. Log in at `https://your-domain.com/sign-in`
2. Access admin panel at `https://your-domain.com/admin`
3. Create team members, job postings, and manage applications

### Important Notes
- **Security**: The `/api/init-db` and `/api/create-admin` endpoints are public but self-protecting
- **One-time setup**: Both endpoints should only be used during initial deployment
- **SSL**: Render and Netlify provide SSL automatically
- **Secrets**: Never commit `.env` files to GitHub

For detailed self-hosting instructions, see [publish_frontend_and_backend_self_host.md](./publish_frontend_and_backend_self_host.md)

---

## 🔧 Admin Tools & Troubleshooting

### Available Admin Routes

| Route | Purpose | Access Level |
|---|---|---|
| `/admin` | Admin dashboard (redirects to `/admin/dashboard`) | Admin/Team Member |
| `/admin/dashboard` | Overview stats and recent activity | Admin/Team Member |
| `/admin/applications` | Manage job applications and resumes | Admin/Team Member |
| `/admin/jobs` | Create, edit, and manage job postings | Admin/Team Member |
| `/admin/messages` | View and reply to contact form submissions | Admin/Team Member |
| `/admin/team` | Manage team members (create, edit, delete) | Admin only |
| `/sign-in` | Authentication page for admin access | Public |
| `/debug` | Debug tool for troubleshooting team accounts | Public (dev only) |

### Debug & Fix Tool

Access the debug tool at **http://localhost:3000/debug** to troubleshoot team member authentication issues.

**Features:**
- **Check Account**: View user and account details from the database
- **Fix ProviderId**: Automatically correct provider ID mismatches
- **Reset Password**: Generate a new password hash for team members

**Usage Example:**
1. Navigate to `http://localhost:3000/debug`
2. Enter the team member's email (e.g., `team@vrtech.com`)
3. Click "Check Account" to view their database records
4. Use "Reset Password" if they can't log in

### Team Member Management

#### Creating Team Members
1. Log in to admin panel at `/admin`
2. Navigate to `/admin/team`
3. Click "Add Team Member"
4. Fill in: Name, Email, Password, Role (admin/team_member)
5. Click "Create"

**Important:** Team members are created using Better-Auth's sign-up API, which handles password hashing correctly. Do not manually insert users into the database.

#### Common Issues & Solutions

**Problem: Team member can't log in**
- **Solution 1**: Use the debug tool at `/debug` to check their account
- **Solution 2**: Reset their password using the debug tool
- **Solution 3**: Delete and recreate the account from `/admin/team`

**Problem: "Invalid password hash" error**
- **Cause**: Account was created with manual database insertion
- **Solution**: Delete the account and recreate it through the admin panel

**Problem: "Credential account not found" error**
- **Cause**: ProviderId mismatch in the database
- **Solution**: Use the debug tool's "Fix ProviderId" button

### Admin Account Recovery

If you accidentally delete the main admin account, you have two options:

#### Option 1: Using CLI Script (Recommended)
```bash
npm run admin:create
```
This will prompt you to create a new admin user with email and password.

#### Option 2: Using pgAdmin
1. Open pgAdmin at `http://localhost:5050`
2. Connect to the `vr_tech_db` database
3. Use the debug tool at `/debug` to create a new account
4. Or manually insert into the `user` and `account` tables (not recommended)

#### Option 3: Using API Endpoint (Production)
If deployed, visit:
```
https://your-domain.com/api/create-admin
```
This endpoint should be protected and only accessible during initial setup.

### Database Direct Access

For advanced troubleshooting, access the database directly:

**Via pgAdmin (Local Development):**
1. Start pgAdmin: `docker-compose --profile tools up -d`
2. Access at `http://localhost:5050`
3. Login with credentials from `.env`
4. Connect to `vr_tech_db`

**Via Command Line:**
```bash
# Connect to local database
docker exec -it vr-tech-postgres psql -U postgres -d vr_tech_db

# View all users
SELECT id, name, email, role, status FROM "user";

# View all accounts
SELECT "userId", "accountId", "providerId" FROM account;
```

### Useful SQL Queries

**Check team member account:**
```sql
SELECT u.email, u.role, u.status, a."providerId"
FROM "user" u
LEFT JOIN account a ON a."userId" = u.id
WHERE u.email = 'team@vrtech.com';
```

**Fix providerId for all accounts:**
```sql
UPDATE account 
SET "providerId" = 'credential' 
WHERE "providerId" = 'email';
```

**Delete a team member completely:**
```sql
DELETE FROM "user" WHERE email = 'team@vrtech.com';
-- Cascading delete will remove associated account and sessions
```

---

## 🛠️ Maintenance Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts development server with Turbopack |
| `npm run build` | Builds the application for production |
| `npm run db:init` | Drops and re-creates all database tables |
| `npm run db:migrate` | Runs specific SQL migrations (004_add_job_id) |
| `npm run admin:create` | Creates a default admin user via CLI |

---

## 📄 License
© 2025 VR Tech Info Inc. All rights reserved.
