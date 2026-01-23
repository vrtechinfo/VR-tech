# Final Steps: Push to GitHub & Deploy

## Current Status

✅ **Completed:**
- All project files are ready
- CI/CD pipeline workflows configured
- Deployment guides created
- 2 commits ready to push

⏳ **Pending:**
- Resolve GitHub authentication
- Push to GitHub repository
- Configure GitHub Secrets
- Trigger initial deployment

## GitHub Authentication Methods

### Method 1: GitHub CLI (RECOMMENDED - Fastest)

**Windows Installation:**

```powershell
# Using Chocolatey
choco install gh

# Or download: https://github.com/cli/cli/releases

# Verify installation
gh --version
```

**Usage:**

```powershell
# Open PowerShell in your project folder
cd "d:\one cloud\OneDrive\Desktop\vr-tech-info"

# Authenticate with GitHub
gh auth login

# Follow the prompts:
# 1. Select: GitHub.com
# 2. Select: HTTPS
# 3. Select: Yes (authenticate Git with credentials)
# 4. Select: Login with a web browser
# 5. Authorize in your browser

# Push to GitHub
git push origin master
```

### Method 2: Personal Access Token (PAT)

**Step 1: Create PAT**

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" (classic)
3. Set name: "VR-Tech Deployment"
4. Select scopes:
   - ✅ repo
   - ✅ workflow
   - ✅ write:packages
5. Click "Generate token"
6. **Copy token immediately** (you won't see it again)

**Step 2: Configure Git**

```powershell
# Option A: Update remote with PAT
$token = "ghp_your_token_here"
git remote set-url origin "https://${token}@github.com/vrtechinfo/VR-tech.git"

# Option B: Configure Git credential helper (Windows)
git config --global credential.helper wincred

# Then when prompted, enter:
# Username: your-github-username
# Password: your-token
```

**Step 3: Push**

```powershell
git push origin master
```

### Method 3: SSH Key

**Step 1: Generate SSH Key**

```powershell
# Generate key (press Enter 3 times for defaults)
ssh-keygen -t ed25519 -C "your-email@github.com"

# Key will be saved to: ~/.ssh/id_ed25519
```

**Step 2: Add to GitHub**

1. Copy public key:
```powershell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

2. Go to https://github.com/settings/ssh/new
3. Title: "VR-Tech Windows"
4. Paste key
5. Click "Add SSH key"

**Step 3: Configure Git Remote**

```powershell
git remote set-url origin git@github.com:vrtechinfo/VR-tech.git

# Test connection
ssh -T git@github.com
# You should see: "Hi username! You've successfully authenticated..."
```

**Step 4: Push**

```powershell
git push origin master
```

## Quick Start Command (Choose One)

### Using GitHub CLI (Easiest)
```powershell
choco install gh
gh auth login
git push origin master
```

### Using PAT
```powershell
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($tokenPlain))
git remote set-url origin "https://${tokenPlain}@github.com/vrtechinfo/VR-tech.git"
git push origin master
```

### Using SSH
```powershell
ssh-keygen -t ed25519 -C "your-email@github.com"
# Add ~/.ssh/id_ed25519.pub to GitHub SSH keys
git remote set-url origin git@github.com:vrtechinfo/VR-tech.git
git push origin master
```

## After Successfully Pushing

### 1. Verify Push

```powershell
# Check remote
git branch -vv

# You should see:
# master abcd1234 [origin/master] commit message
```

Visit: https://github.com/vrtechinfo/VR-tech/commits/master

### 2. Configure Secrets

Go to: **Settings** > **Secrets and variables** > **Actions**

Add these secrets:

```
DATABASE_URL = postgresql://user:password@host/database
NEXT_PUBLIC_SITE_URL = https://vr-tech.com (or your production URL)
```

Optional (for deployments):
```
VERCEL_TOKEN = (if using Vercel)
DEPLOY_SERVER_HOST = (if using self-hosted)
DEPLOY_SERVER_USER = (if using self-hosted)
DEPLOY_SERVER_SSH_KEY = (if using self-hosted)
SLACK_WEBHOOK_URL = (for notifications)
```

### 3. Watch Workflow Run

1. Go to: https://github.com/vrtechinfo/VR-tech/actions
2. You should see both workflows running
3. Check the CI workflow first (it tests the build)
4. If it passes, deploy workflow will run

### 4. Set Up Branch Protection (Optional but Recommended)

Go to: **Settings** > **Branches** > **Add rule**

Pattern: `master`

Enable:
- [x] Require pull request before merging
- [x] Require status checks to pass
- [x] Require branches to be up to date before merging

## Troubleshooting

### Push Still Fails with "Permission denied"

**Solution 1: Check if account has access**
- Ensure your GitHub account is a member of the `vrtechinfo` organization
- Check: https://github.com/vrtechinfo/people

**Solution 2: Clear cached credentials**

PowerShell:
```powershell
# Windows Credential Manager
cmdkey /delete:git:https://github.com

# Git credential cache
git credential-manager-core erase

# Try pushing again
git push origin master
```

### Workflows not running after push

**Check:**
1. Workflows are enabled: Settings > Actions > General > "Allow all actions"
2. Branch exists: git branch -a
3. Commits were pushed: git log origin/master

## Deployment Options After Push

### Option A: Vercel (Recommended)

1. Go to https://vercel.com
2. Import GitHub repository
3. Add environment variables
4. Deploy

### Option B: Self-Hosted Docker

1. Install Docker on server
2. Create SSH key and add to GitHub secrets
3. Workflow will auto-deploy on push

### Option C: GitHub Container Registry

Docker image available at:
```
ghcr.io/vrtechinfo/VR-tech:latest
```

Pull and run:
```bash
docker pull ghcr.io/vrtechinfo/VR-tech:latest
docker run -d -p 3000:3000 ghcr.io/vrtechinfo/VR-tech:latest
```

## Files Created

```
.github/
├── workflows/
│   ├── ci.yml              (140 lines) Build & test
│   └── deploy.yml          (100 lines) Deployment
├── SECRETS.md              Setup guide for secrets
├── BRANCH_PROTECTION.md    Branch rule configuration
└── CI_CD_SETUP.md          CI/CD overview

DEPLOYMENT.md              (300+ lines) Full deployment guide
```

## Support

- GitHub Authentication Issues: https://docs.github.com/en/get-started/getting-started-with-git
- GitHub Actions: https://docs.github.com/en/actions
- Workflows: https://github.com/vrtechinfo/VR-tech/actions

## Next: Get Started

Choose your authentication method from above and run the push command!

After push succeeds, you'll see:
```
To https://github.com/vrtechinfo/VR-tech.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

Then configure secrets and watch the workflows run! 🚀
