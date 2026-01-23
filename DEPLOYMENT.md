# Deployment Guide

This guide covers setting up and deploying the VR-Tech application using the CI/CD pipeline.

## Quick Start

### 1. Verify GitHub Repository Access

First, ensure you can access the repository and set up Git credentials:

```bash
# Check current remote
git remote -v

# If you need to update credentials (use personal access token instead of password)
git remote set-url origin https://github.com/vrtechinfo/VR-tech.git

# Configure git credentials
git config --global user.name "Your Name"
git config --global user.email "your-email@github.com"
```

### 2. Push Changes to GitHub

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Your commit message"

# Push to repository
git push origin master
```

### 3. Set Up GitHub Secrets

Navigate to **Settings > Secrets and variables > Actions** and add:

| Secret | Example Value |
|--------|---------------|
| DATABASE_URL | postgresql://user:pass@localhost/vr_tech |
| NEXT_PUBLIC_SITE_URL | https://vr-tech.com |
| VERCEL_TOKEN | (optional) |
| DEPLOY_SERVER_HOST | (optional) |
| DEPLOY_SERVER_USER | (optional) |
| DEPLOY_SERVER_SSH_KEY | (optional) |

## CI/CD Pipeline Overview

### 1. CI Workflow (`ci.yml`)

Runs on every push and pull request:

- **Build Test**: Tests with Node 18 and 20
- **Linting**: Code quality checks
- **Build**: Compiles Next.js application
- **Tests**: Runs test suite (if available)
- **Security Scan**: Vulnerability detection
- **Docker Build**: Creates Docker image

### 2. Deployment Workflow (`deploy.yml`)

Runs on push to master/main:

- **Build**: Compiles application
- **Docker Push**: Pushes to GitHub Container Registry
- **Vercel Deploy**: (Optional) Deploys to Vercel
- **SSH Deploy**: (Optional) Deploys to self-hosted server
- **Slack Notify**: (Optional) Sends deployment notifications

## Deployment Options

### Option A: Vercel (Recommended for Next.js)

**Setup:**

1. Create account at https://vercel.com
2. Import your GitHub repository
3. Get `VERCEL_TOKEN` from Account Settings > Tokens
4. Add these secrets to GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

**Features:**
- ✅ Automatic deployments
- ✅ Preview deployments for PRs
- ✅ Edge Functions support
- ✅ Serverless Database
- ✅ Built-in Analytics

### Option B: Self-Hosted Server (Docker)

**Prerequisites:**
- Server with Docker and Docker Compose
- SSH access configured
- PM2 or similar process manager

**Setup:**

1. Generate SSH key (if not already done):
```bash
ssh-keygen -t ed25519 -C "deploy@vr-tech"
```

2. Add public key to server:
```bash
cat ~/.ssh/id_ed25519.pub | ssh user@server "cat >> ~/.ssh/authorized_keys"
```

3. Add GitHub secrets:
   - `DEPLOY_SERVER_HOST`: Your server IP/hostname
   - `DEPLOY_SERVER_USER`: SSH username
   - `DEPLOY_SERVER_SSH_KEY`: Private SSH key content

4. On server, clone repository:
```bash
cd /app
git clone https://github.com/vrtechinfo/VR-tech.git
cd VR-tech
npm install
npm run build
```

5. Set up PM2:
```bash
npm install -g pm2
pm2 start npm --name vr-tech -- start
pm2 save
pm2 startup
```

### Option C: GitHub Container Registry (GHCR)

**Features:**
- Free container registry
- Integrated with GitHub
- Auto-built on every push

**Usage:**

```bash
# Login to GHCR
docker login ghcr.io -u ${{ github.actor }} -p ${{ secrets.GITHUB_TOKEN }}

# Pull image
docker pull ghcr.io/vrtechinfo/VR-tech:latest

# Run container
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_SITE_URL="https://..." \
  ghcr.io/vrtechinfo/VR-tech:latest
```

## Environment Configuration

### Development (.env.local)

```env
DATABASE_URL=postgresql://user:password@localhost/vr_tech_dev
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BETTER_AUTH_SECRET=dev-secret-change-in-production
```

### Production (.env.production - don't commit!)

```env
DATABASE_URL=postgresql://user:password@prod-host/vr_tech
NEXT_PUBLIC_SITE_URL=https://vr-tech.com
BETTER_AUTH_SECRET=<strong-random-secret>
BETTER_AUTH_URL=https://vr-tech.com/api/auth
NODE_ENV=production
```

## Monitoring & Logs

### GitHub Actions

1. Go to repository > **Actions** tab
2. Click on workflow run
3. View logs for each job
4. Download artifacts if available

### Application Logs

**Vercel:**
- Dashboard > Project > Logs

**Self-Hosted:**
```bash
# PM2 logs
pm2 logs vr-tech

# Docker logs
docker logs <container-id>

# System logs
journalctl -u docker -f
```

## Troubleshooting

### Deployment fails with permission denied

**Issue:** `Permission to vrtechinfo/VR-tech.git denied`

**Solution:**
1. Use Personal Access Token (PAT) instead of password
2. Create PAT at https://github.com/settings/tokens
3. Use format: `https://token@github.com/vrtechinfo/VR-tech.git`

### Docker build fails

**Check:**
1. Dockerfile syntax: `docker build .`
2. Required dependencies in package.json
3. Build environment variables are set in secrets

### Database connection errors

**Check:**
1. DATABASE_URL is correct
2. Database server is running
3. Firewall allows connection
4. Credentials are valid

## Rollback Strategy

If deployment fails:

**Vercel:**
```
Dashboard > Deployments > Click previous working version > Redeploy
```

**Self-Hosted:**
```bash
git revert <commit-hash>
git push origin master
# CI/CD will auto-deploy reverted version
```

## Performance Optimization

### Next.js Optimization

Already configured in `next.config.ts`:

- ✅ Image optimization
- ✅ CSS minification
- ✅ JavaScript bundling
- ✅ SWC compilation

### Database Optimization

1. Add indexes to frequently queried columns
2. Use connection pooling
3. Monitor slow queries

### Caching

GitHub Actions cache is configured for:
- npm packages
- Docker layers
- Build artifacts

## Maintenance

### Regular Tasks

- [ ] Update dependencies: `npm update`
- [ ] Review security advisories: `npm audit`
- [ ] Check deployment logs weekly
- [ ] Backup database regularly
- [ ] Rotate secrets periodically

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update patches only (safe)
npm update

# Update minor versions
npm upgrade

# Update major versions (requires testing)
npm install package@latest
```

## Support

For issues with:

- **GitHub Actions**: https://docs.github.com/en/actions
- **Next.js**: https://nextjs.org/docs
- **Docker**: https://docs.docker.com
- **Vercel**: https://vercel.com/docs
