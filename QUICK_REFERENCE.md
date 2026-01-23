# Quick Reference Guide

## 🚀 3-Step Quick Start

### Step 1: Authenticate (Choose One)

```powershell
# OPTION A: GitHub CLI (Easiest)
choco install gh
gh auth login
git push origin master

# OPTION B: Personal Access Token
# 1. Create at: github.com/settings/tokens
# 2. Copy token
# 3. Configure: git remote set-url origin https://TOKEN@github.com/vrtechinfo/VR-tech.git
# 4. Push: git push origin master

# OPTION C: SSH Key
# 1. Generate: ssh-keygen -t ed25519 -C "your-email@github.com"
# 2. Add to GitHub at: github.com/settings/ssh/new
# 3. Configure: git remote set-url origin git@github.com:vrtechinfo/VR-tech.git
# 4. Push: git push origin master
```

### Step 2: Configure Secrets

Go to: **github.com/vrtechinfo/VR-tech** → **Settings** → **Secrets and variables** → **Actions**

**Required:**
```
DATABASE_URL = postgresql://user:password@host/database
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

**Optional (for deployments):**
```
VERCEL_TOKEN
DEPLOY_SERVER_HOST
DEPLOY_SERVER_USER
DEPLOY_SERVER_SSH_KEY
SLACK_WEBHOOK_URL
```

### Step 3: Watch Deployment

Go to: **github.com/vrtechinfo/VR-tech** → **Actions**

Watch the workflows run automatically!

---

## 📋 Workflow Files at a Glance

### `.github/workflows/ci.yml` (Runs on every push/PR)
```
✅ Build Test (Node 18 & 20)
✅ Linting
✅ Unit Tests
✅ Security Scan
✅ Docker Build
```

### `.github/workflows/deploy.yml` (Runs on push to master)
```
✅ Build Application
✅ Push to Docker Registry
✅ Deploy to Vercel (optional)
✅ Deploy to Self-Hosted (optional)
✅ Slack Notify (optional)
```

---

## 🗂️ Important Files

| File | What It Does |
|------|-------------|
| `.github/workflows/ci.yml` | Build & test automation |
| `.github/workflows/deploy.yml` | Deployment automation |
| `Dockerfile` | Docker container setup |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript settings |
| `package.json` | Dependencies & scripts |

---

## 📊 Deployment Options

### Option A: Vercel (Recommended for Next.js)
```
1. Go to vercel.com
2. Import GitHub repo
3. Set environment variables
4. Auto-deploys on every push
```

### Option B: Self-Hosted Docker
```
1. Server with Docker installed
2. Set DEPLOY_SERVER_* secrets
3. Auto-deploys via SSH on every push
```

### Option C: Docker Registry (Free)
```
Image: ghcr.io/vrtechinfo/VR-tech:latest
docker pull ghcr.io/vrtechinfo/VR-tech:latest
```

---

## 🔍 Verify It's Working

```powershell
# Check commit history
git log --oneline -5

# Check remote
git remote -v

# Check branch tracking
git branch -vv

# Expected output:
# master abc1234 [origin/master] commit message
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Push fails with "Permission denied" | Use GitHub CLI: `gh auth login` then `git push` |
| Workflows not running | Enable Actions in Settings > Actions > General |
| Docker build fails | Check Dockerfile syntax: `docker build .` |
| Deployment fails | Check GitHub Secrets are configured correctly |
| Can't find workflow logs | Go to Actions tab > Click workflow > View logs |

---

## 📞 Support Resources

- **GitHub Actions**: https://docs.github.com/actions
- **GitHub CLI**: https://cli.github.com
- **Next.js**: https://nextjs.org/docs
- **Docker**: https://docs.docker.com
- **Vercel**: https://vercel.com/docs

---

## ⏱️ Expected Times

| Task | Time |
|------|------|
| Push to GitHub | 1-2 minutes |
| CI workflow | 5-10 minutes |
| Deploy to Vercel | 3-5 minutes |
| Deploy self-hosted | 5-10 minutes |

---

## 📈 Project Stats

```
✅ Commits pending: 4
✅ Workflow files: 2
✅ Documentation: 5 files
✅ Total setup time: < 1 hour
```

---

## 🎯 After Push Succeeds

```
✅ Code on GitHub
✅ CI runs automatically
✅ Staging build available
✅ Ready for production deployment
✅ Team can start collaborating
```

---

## 💡 Pro Tips

1. **Use branch protection**: Require CI to pass before merge
2. **Enable auto-merge**: Auto-merge PRs when CI passes
3. **Use semantic commits**: `feat:`, `fix:`, `docs:` prefixes
4. **Monitor logs**: Check Actions tab regularly
5. **Update dependencies**: Run `npm update` monthly
6. **Backup secrets**: Keep backup of secrets in secure location

---

## 🔑 Git Commands Cheat Sheet

```powershell
# See what will be pushed
git log origin/master..master

# Push current branch
git push origin master

# Check remote
git remote -v

# Update local from remote
git pull origin master

# View commits
git log --oneline -10

# Check status
git status

# View branches
git branch -a
```

---

## 📦 Docker Commands (After Deployment)

```bash
# Pull latest image
docker pull ghcr.io/vrtechinfo/VR-tech:latest

# Run container
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="..." \
  ghcr.io/vrtechinfo/VR-tech:latest

# View logs
docker logs <container-id>

# Stop container
docker stop <container-id>

# Remove old images
docker image prune
```

---

**Ready? Follow the 3-step quick start above and your project will be deployed! 🚀**

For detailed instructions, see:
- [PUSH_TO_GITHUB.md](./PUSH_TO_GITHUB.md) - Push instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [.github/SECRETS.md](./.github/SECRETS.md) - Secrets setup
