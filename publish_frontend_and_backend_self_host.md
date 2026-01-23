# Publish Frontend and Backend Self Host

This document provides a step-by-step guide to deploying the **VR Tech Info** project globally. We will use **GitHub** for version control, **Render** for the Database and Backend (Dockerized), and **Netlify** for the Frontend/Full-stack hosting.

---

## 🏗️ Deployment Strategy

1.  **Version Control**: Host the code on **GitHub**.
2.  **Database & Backend (Self-Host Style)**: Use **Render** to run a PostgreSQL database and the Next.js server as a persistent Docker container.
3.  **Frontend (Global Edge)**: Use **Netlify** to host the application for high availability and performance.

---

## 📡 Phase 1: GitHub Setup

Before deploying, your code must be in a remote repository.

1.  **Create Repository**: Go to [GitHub](https://github.com/new) and create a private or public repository named `vr-tech-info`.
2.  **Initialize Git** (if not done):
    ```powershell
    git init
    git add .
    git commit -m "chore: prepare for version 1.0 deployment"
    ```
3.  **Push to GitHub**:
    ```powershell
    git remote add origin https://github.com/<your-username>/vr-tech-info.git
    git branch -M main
    git push -u origin main
    ```

---

## 🗄️ Phase 2: Database Deployment (Render)

1.  **Sign in to Render**: Go to [dashboard.render.com](https://dashboard.render.com).
2.  **Create Database**:
    - Click **New +** > **PostgreSQL**.
    - **Name**: `vr-tech-db`
    - **Database**: `vr_tech_info`
    - **User**: (Auto-generated)
    - **Plan**: Free (or preferred).
3.  **Get Connection String**: Once created, copy the **External Connection String**. It will look like: 
    `postgresql://user:password@hostname/dbname?sslmode=require`

---

## 🐳 Phase 3: Backend Deployment (Render Web Service)

Since the project has a `Dockerfile`, we can host the Next.js "Backend" (Server) on Render.

1.  **Create Web Service**:
    - Click **New +** > **Web Service**.
    - Connect your GitHub repository.
    - **Name**: `vr-tech-backend`
    - **Runtime**: `Docker`.
2.  **Configure Env Vars**: Go to the **Environment** tab and add:
    - `DATABASE_URL`: (The External String from Phase 2)
    - `BETTER_AUTH_SECRET`: (Generate a random 32-char string)
    - `NEXT_PUBLIC_APP_URL`: (The URL Render gives you, e.g., `https://vr-tech-backend.onrender.com`)
    - `CLOUDFLARE_R2_...`: (Your storage credentials)
3.  **Deploy**: Render will build the image from the `Dockerfile` and start the server.

---

## 🌐 Phase 4: Frontend Deployment (Netlify)

Netlify provides an excellent developer experience for Next.js.

1.  **Sign in to Netlify**: Go to [app.netlify.com](https://app.netlify.com).
2.  **Add New Site**:
    - Click **Import from Git**.
    - Select your GitHub repo.
3.  **Site Settings**:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `.next` (Netlify handles this automatically for Next.js).
4.  **Environment Variables**:
    - Add the same variables as in Phase 3.
    - **Crucial**: Set `NEXT_PUBLIC_APP_URL` to your Netlify URL (e.g., `https://vr-tech-info.netlify.app`).
5.  **Deploy**: Netlify will trigger a build and deploy the app.

---

## 🚀 Phase 5: Final Initialization

Once both are deployed, complete the setup:

### Step 1: Initialize Database Schema
Visit your live URL + `/api/init-db` to create all tables:
```
https://your-site.netlify.app/api/init-db
```

**What this does:**
- Creates all database tables (`user`, `session`, `account`, `verification`, `contact_submissions`, `career_applications`, `job_postings`)
- Sets up indexes for performance
- Only needs to be run once

### Step 2: Create Admin Account
Visit your live URL + `/api/create-admin`:
```
https://your-site.netlify.app/api/create-admin
```

**Fill in the form:**
- **Name**: Your admin name
- **Email**: Your admin email
- **Password**: Secure password (min 8 characters)

**Security Note:** This endpoint automatically disables itself after the first admin is created, preventing unauthorized access.

### Step 3: Verify Setup
1. Log in to the admin dashboard:
   ```
   https://your-site.netlify.app/sign-in
   ```
2. Access admin panel:
   ```
   https://your-site.netlify.app/admin
   ```
3. Create team members, job postings, and start managing applications!

### Alternative: CLI Admin Creation (Optional)
If you prefer to create admin via command line:
```powershell
# Locally, temporarily change your .env DATABASE_URL to production
npm run admin:create
```

---

## 🛡️ Security Checklists

> [!IMPORTANT]
> - **SSL**: Both Render and Netlify provide SSL automatically. Ensure `ssl: { rejectUnauthorized: false }` is kept in your code for Render DB connections.
> - **Secrets**: Never commit your `.env` file to GitHub.
> - **CORS**: Ensure `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` match across all services.

---

## 📊 Summary Schematic

```mermaid
graph TD
    User([User]) --> Netlify[Netlify - Frontend/Primary App]
    Netlify --> RenderDB[(Render - PostgreSQL)]
    Netlify --> R2[Cloudflare R2 - Storage]
    
    subgraph "Self-Hosted Backend Option"
        RenderWeb[Render - Dockerized Backend]
        RenderWeb --> RenderDB
    end
```
