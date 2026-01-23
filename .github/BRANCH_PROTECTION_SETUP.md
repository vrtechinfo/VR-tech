# Branch Protection Configuration

To enable comprehensive branch protection and enforce security standards, configure the following in GitHub repository settings:

## Main Branch Protection Rules

### Basic Settings
- ✅ Require pull request reviews before merging
  - Dismiss stale pull request approvals when new commits are pushed
  - Require code review from code owners
  - Restrict who can dismiss pull requests (dismiss staleness)

### Status Checks
- ✅ Require status checks to pass before merging:
  - `build` - Next.js build must pass
  - `security-scanning` - All security scans must pass
  - `codeql` - CodeQL analysis must pass
  - `trivy-scan` - Trivy vulnerability scan must pass
  - `npm-audit` - npm audit must pass

- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging

### Advanced Security
- ✅ Require deployment status to pass (if applicable)
- ✅ Require signed commits
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require pull request reviews from code owners
- ✅ Lock branch (optional - for production branches)

### Restrictions
- ✅ Restrict who can push to matching branches (admin only)

## Setup Instructions

1. Go to repository Settings → Branches
2. Add rule for `main` branch
3. Add rule for `master` branch
4. Add rule for `develop` branch (optional, less restrictive)

## Dependabot Integration

Dependabot is configured to:
- Check npm dependencies weekly
- Check Docker images weekly
- Check GitHub Actions weekly
- Create pull requests with updates
- Auto-merge minor and patch updates (optional)

## Security Best Practices

### Never in the repository:
- Private keys or certificates
- Database passwords
- API tokens or credentials
- Private configuration files

### Use GitHub Secrets for:
- Database credentials
- API keys
- Deployment tokens
- Third-party service credentials

### Required environment variables:
See `.env.example` for complete list of required environment variables.

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by following the SECURITY.md guidelines. Do not create public issues for security vulnerabilities.
