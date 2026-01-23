# Branch Protection Rules

This file documents the recommended branch protection rules for the repository.

## How to Enable Branch Protection

1. Go to repository **Settings**
2. Navigate to **Branches**
3. Click **Add rule** under "Branch protection rules"
4. Set rule pattern to `master` or `main`
5. Configure the settings below

## Recommended Configuration

### Basic Protection

- [x] **Require a pull request before merging**
  - Dismiss stale pull request approvals when new commits are pushed
  - Require code review from a code owner

- [x] **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Select required status checks:
    - `build (18.x)`
    - `build (20.x)`
    - `security`
    - `docker-build`

- [x] **Require branches to be up to date before merging**

### Advanced Protection

- [x] **Restrict who can push to matching branches**
  - Allow only administrators to push

- [x] **Allow force pushes**
  - Only allow admins to force push

- [x] **Allow deletions**
  - Disabled (prevent accidental deletion)

## Code Owners

Create `.github/CODEOWNERS` file:

```
# Default owners for all code
* @maintainer1 @maintainer2

# Admin pages
src/app/(admin)/ @admin-team

# Authentication
src/auth.ts @auth-lead
src/components/auth/ @auth-lead

# Database
src/lib/db/ @database-lead

# Deployment
.github/ @devops-team
Dockerfile @devops-team
docker-compose.yml @devops-team
```

## PR Review Requirements

- **Minimum reviewers**: 2
- **Dismiss stale reviews**: Yes
- **Require review from code owner**: Yes

## Automated Pull Request Checks

The CI pipeline automatically checks:

- ✅ Code builds successfully
- ✅ Tests pass
- ✅ Linting passes
- ✅ No security vulnerabilities
- ✅ Docker image builds

All checks must pass before merge is allowed.

## Merge Restrictions

- **Allow squash merging**: Yes
- **Allow rebase merging**: Yes
- **Allow merge commits**: No (for clean history)

Recommended: Use squash and merge to maintain clean commit history.
