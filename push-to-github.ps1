#!/usr/bin/env powershell
# VR-Tech GitHub Push Automation Script
# This script automates the GitHub authentication and push process

param(
    [ValidateSet('gh', 'pat', 'ssh')]
    [string]$AuthMethod = 'gh',
    [string]$GitHubToken,
    [string]$Repository = 'vrtechinfo/VR-tech'
)

function Write-Header {
    param([string]$Text)
    Write-Host "`n$('='*60)" -ForegroundColor Cyan
    Write-Host "  $Text" -ForegroundColor Cyan
    Write-Host "$('='*60)`n" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Text)
    Write-Host "✅ $Text" -ForegroundColor Green
}

function Write-Error {
    param([string]$Text)
    Write-Host "❌ $Text" -ForegroundColor Red
}

function Write-Warning {
    param([string]$Text)
    Write-Host "⚠️  $Text" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Text)
    Write-Host "ℹ️  $Text" -ForegroundColor Blue
}

# Main execution
Write-Header "VR-Tech GitHub Push Script"

# Check git installation
Write-Info "Checking Git installation..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH"
    exit 1
}
Write-Success "Git found"

# Check current directory
Write-Info "Checking current directory..."
if (-not (Test-Path ".git")) {
    Write-Error "Not a git repository. Please run from the project root."
    exit 1
}
Write-Success "Git repository found"

# Show current status
Write-Header "Current Git Status"
git status

# Choose authentication method
Write-Header "Authentication Method"
Write-Info "Selected method: $AuthMethod"

switch ($AuthMethod) {
    'gh' {
        Write-Info "Using GitHub CLI authentication..."
        
        # Check if GitHub CLI is installed
        if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
            Write-Warning "GitHub CLI not found. Installing..."
            try {
                choco install gh -y
                Write-Success "GitHub CLI installed"
            }
            catch {
                Write-Error "Failed to install GitHub CLI. Install manually from: https://cli.github.com"
                exit 1
            }
        }
        
        # Authenticate
        Write-Info "Launching GitHub authentication..."
        & gh auth login
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "GitHub CLI authentication failed"
            exit 1
        }
        Write-Success "GitHub CLI authentication successful"
    }
    
    'pat' {
        if (-not $GitHubToken) {
            $GitHubToken = Read-Host "Enter your Personal Access Token"
            if (-not $GitHubToken) {
                Write-Error "No token provided"
                exit 1
            }
        }
        
        Write-Info "Configuring Git with Personal Access Token..."
        $remoteUrl = "https://$($GitHubToken)@github.com/$Repository.git"
        & git remote set-url origin $remoteUrl
        
        Write-Success "Git configured with PAT"
    }
    
    'ssh' {
        Write-Info "Using SSH authentication..."
        Write-Warning "Ensure your SSH key is added to GitHub at: https://github.com/settings/ssh/new"
        
        $remoteUrl = "git@github.com:$Repository.git"
        & git remote set-url origin $remoteUrl
        
        Write-Success "Git configured for SSH"
    }
}

# Verify remote
Write-Header "Verifying Remote Configuration"
Write-Info "Remote URL:"
& git remote -v

# Show commits to push
Write-Header "Commits to Push"
Write-Info "Unpushed commits:"
& git log --oneline origin/master..master

# Push to GitHub
Write-Header "Pushing to GitHub"
Write-Info "Pushing commits to $Repository..."

try {
    & git push -u origin master
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Push completed successfully!"
    }
    else {
        Write-Error "Push failed"
        exit 1
    }
}
catch {
    Write-Error "Error during push: $_"
    exit 1
}

# Final status
Write-Header "Setup Complete!"
Write-Success "Code pushed to GitHub"
Write-Success "Repository: https://github.com/$Repository"
Write-Success "Actions: https://github.com/$Repository/actions"

Write-Header "Next Steps"
Write-Info "1. Configure GitHub Secrets:"
Write-Info "   Go to: Settings > Secrets and variables > Actions"
Write-Info ""
Write-Info "2. Add these secrets:"
Write-Info "   - DATABASE_URL"
Write-Info "   - NEXT_PUBLIC_SITE_URL"
Write-Info ""
Write-Info "3. Watch the CI/CD pipeline:"
Write-Info "   Go to: Actions tab"
Write-Info ""
Write-Info "For detailed instructions, see:"
Write-Info "   - PUSH_TO_GITHUB.md"
Write-Info "   - DEPLOYMENT.md"
Write-Info "   - QUICK_REFERENCE.md"

Write-Header "Documentation"
Write-Info "📄 SETUP_SUMMARY.md     - Complete setup overview"
Write-Info "📄 PUSH_TO_GITHUB.md    - Detailed push instructions"
Write-Info "📄 DEPLOYMENT.md        - Deployment options & guide"
Write-Info "📄 QUICK_REFERENCE.md   - Quick commands & troubleshooting"
Write-Info "📄 .github/SECRETS.md   - GitHub Secrets configuration"

Write-Host "`n✨ Your VR-Tech project is ready for deployment! 🚀`n" -ForegroundColor Green
