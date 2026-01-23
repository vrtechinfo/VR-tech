# VR Tech Info - Production Deployment Plan

Complete guide to deploying **VR Tech Info** to production using **GitHub**, **Render** (Database), and **Netlify** (Frontend).

---

## 🏗️ Deployment Strategy

1. **Version Control**: Host code on **GitHub**
2. **Database**: PostgreSQL on **Render** (free tier available)
3. **Frontend/Backend**: Next.js on **Netlify** (serverless edge deployment)
4. **Storage**: Cloudflare R2 for resume uploads

---

## 📡 Phase 1: GitHub Setup

1. **Create Repository**: [GitHub](https://github.com/new) → `vr-tech-info`
2. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "chore: production deployment v1.0"
   ```
3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/vr-tech-info.git
   git branch -M main
   git push -u origin main
   ```

---

## 🗄️ Phase 2: Database Deployment (Render)

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. **New +** → **PostgreSQL**
3. Configure:
   - **Name**: `vr-tech-db`
   - **Database**: `vr_tech_info`
   - **Plan**: Free
4. **Copy External Connection String**:
   ```
   postgresql://user:password@hostname/dbname?sslmode=require
   ```

---

## 🌐 Phase 3: Frontend Deployment (Netlify)

1. Go to [app.netlify.com](https://app.netlify.com)
2. **Import from Git** → Select your GitHub repo
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next` (auto-detected)
4. **Environment Variables** (Site settings → Environment variables):
   ```env
   DATABASE_URL=postgresql://user:password@hostname/dbname?sslmode=require
   BETTER_AUTH_SECRET=<generate-random-32-char-string>
   NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
   SITE_URL=https://your-site.netlify.app
   CLOUDFLARE_R2_ENDPOINT=https://<id>.r2.cloudflarestorage.com
   CLOUDFLARE_R2_ACCESS_KEY_ID=<your-key>
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=<your-secret>
   CLOUDFLARE_R2_BUCKET_NAME=<your-bucket>
   ```
5. **Deploy** → Netlify builds and deploys automatically

---

## 🚀 Phase 4: Production Initialization

### Step 1: Initialize Database Schema
Visit (one time only):
```
https://your-site.netlify.app/api/init-db
```
Creates all tables: `user`, `session`, `account`, `verification`, `contact_submissions`, `career_applications`, `job_postings`

### Step 2: Create Admin Account
Visit (one time only):
```
https://your-site.netlify.app/api/create-admin
```
Fill in the form:
- **Name**: Your admin name
- **Email**: Your admin email  
- **Password**: Secure password (min 8 characters)

**Security**: This endpoint auto-disables after first admin creation.

### Step 3: Verify & Start Using
1. Sign in: `https://your-site.netlify.app/sign-in`
2. Admin panel: `https://your-site.netlify.app/admin`
3. Create team members, job postings, manage applications

---

## � Optional: Self-Hosted Backend (Render Docker)

If you prefer a traditional backend server instead of serverless:

1. **New +** → **Web Service**
2. Connect GitHub repo
3. **Runtime**: Docker
4. Add same environment variables
5. Render builds from `Dockerfile`

**Note**: Netlify deployment is recommended for better performance and lower costs.

---

## 🛡️ Security Checklist

> [!IMPORTANT]
> - ✅ **SSL**: Auto-enabled on Render & Netlify
> - ✅ **Secrets**: Never commit `.env` to GitHub
> - ✅ **CORS**: Ensure `NEXT_PUBLIC_APP_URL` matches across services
> - ✅ **Init Endpoints**: `/api/init-db` and `/api/create-admin` are self-protecting
> - ✅ **Database**: Use external connection string with `sslmode=require`

---

## 🔧 Troubleshooting

### Admin Login Issues
- Use `/debug` page to check account status
- Verify `BETTER_AUTH_SECRET` is set correctly
- Check database connection string

### Database Connection Errors
- Ensure `DATABASE_URL` includes `?sslmode=require`
- Verify Render database is active
- Check IP whitelist (Render allows all by default)

### Build Failures
- Check environment variables are set in Netlify
- Verify `package.json` has all dependencies
- Review build logs for specific errors

---

## 📊 Architecture Diagram

```mermaid
graph TD
    User([Users]) --> Netlify[Netlify Edge Network]
    Netlify --> RenderDB[(Render PostgreSQL)]
    Netlify --> R2[Cloudflare R2 Storage]
    Netlify --> Auth[Better-Auth Sessions]
    
    Admin([Admin Users]) --> AdminPanel[Admin Dashboard]
    AdminPanel --> Netlify
    
    style Netlify fill:#00C7B7
    style RenderDB fill:#46E3B7
    style R2 fill:#F38020
```

---

## 📋 Post-Deployment Checklist

- [ ] Database initialized via `/api/init-db`
- [ ] Admin account created via `/api/create-admin`
- [ ] Admin login successful at `/sign-in`
- [ ] Team members can be created at `/admin/team`
- [ ] Job postings can be created at `/admin/jobs`
- [ ] Contact form submissions work
- [ ] Career applications with resume upload work
- [ ] Custom domain configured (optional)
- [ ] Analytics/monitoring set up (optional)

---

## 🎯 Next Steps

1. **Custom Domain**: Configure in Netlify settings
2. **Email Service**: Set up SMTP for contact form replies
3. **Monitoring**: Add error tracking (Sentry, LogRocket)
4. **Backups**: Schedule database backups on Render
5. **CDN**: Cloudflare R2 already provides CDN for uploads

---

**Deployment Complete!** 🚀

Your VR Tech Info platform is now live and ready to handle job applications, team management, and client inquiries.
