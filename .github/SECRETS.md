# GitHub Secrets Configuration

To set up the CI/CD pipeline properly, add the following secrets to your GitHub repository:

## Settings > Secrets and variables > Actions

### Required Secrets:

1. **DATABASE_URL**
   - Your PostgreSQL or database connection string
   - Format: `postgresql://user:password@host:port/database`

2. **NEXT_PUBLIC_SITE_URL**
   - Your production site URL
   - Example: `https://vr-tech.com`

### Optional Secrets (for enhanced features):

3. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Needed for: Automatic Vercel deployments

4. **VERCEL_ORG_ID**
   - Your Vercel organization ID
   - Found in Vercel dashboard

5. **VERCEL_PROJECT_ID**
   - Your Vercel project ID
   - Found in project settings

6. **DEPLOY_SERVER_HOST**
   - IP or hostname of your self-hosted server
   - Example: `192.168.1.100` or `server.example.com`

7. **DEPLOY_SERVER_USER**
   - SSH username for deployment server
   - Usually: `deploy` or `ubuntu`

8. **DEPLOY_SERVER_SSH_KEY**
   - Your private SSH key for server access
   - Generate: `ssh-keygen -t ed25519 -C "deploy@vr-tech"`
   - Copy content of private key (not .pub file)

9. **SLACK_WEBHOOK_URL**
   - For deployment notifications
   - Get from: https://api.slack.com/messaging/webhooks

## How to Add Secrets:

1. Go to your GitHub repository
2. Click **Settings** tab
3. Navigate to **Secrets and variables** > **Actions**
4. Click **New repository secret**
5. Add each secret with its value
6. Click **Add secret**

## Environment Variables (in .env files):

Create a `.env.production` file for production environment:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://vr-tech.com

# Authentication
BETTER_AUTH_SECRET=<generate-random-secret>
BETTER_AUTH_URL=https://vr-tech.com/api/auth

# Email (if using)
EMAIL_FROM=noreply@vr-tech.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Testing Secrets Locally:

Use a `.env.local` file:

```bash
# Create from template
cp .env.example .env.local

# Edit with your actual values
```

## Security Best Practices:

1. ✅ Never commit secrets to Git
2. ✅ Use `.gitignore` for `.env.local` files
3. ✅ Rotate SSH keys periodically
4. ✅ Use strong, unique passwords
5. ✅ Enable branch protection rules
6. ✅ Review deployment logs regularly
7. ✅ Keep dependencies updated
