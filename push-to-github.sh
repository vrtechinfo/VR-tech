#!/bin/bash
# VR-Tech GitHub Push Automation Script (Linux/macOS)
# This script automates the GitHub authentication and push process

set -e

PROJECT_NAME="VR-Tech"
REPOSITORY="vrtechinfo/VR-tech"
GITHUB_URL="https://github.com/${REPOSITORY}"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${CYAN}================================${NC}"
    echo -e "${CYAN}  $1${NC}"
    echo -e "${CYAN}================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if in git repository
if [ ! -d ".git" ]; then
    print_error "Not a git repository. Please run from the project root."
    exit 1
fi

print_header "${PROJECT_NAME} GitHub Push Script"

# Check git installation
print_info "Checking Git installation..."
if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    exit 1
fi
print_success "Git found"

# Show current status
print_header "Current Git Status"
git status

# Check for pending commits
COMMITS=$(git log origin/master..master --oneline | wc -l)
if [ $COMMITS -eq 0 ]; then
    print_warning "No commits to push"
    exit 0
fi

print_info "Found $COMMITS commit(s) to push"

# Authentication method
AUTH_METHOD="${1:-gh}"

print_header "Authentication Setup"
print_info "Using method: $AUTH_METHOD"

case $AUTH_METHOD in
    gh)
        print_info "Using GitHub CLI authentication..."
        if ! command -v gh &> /dev/null; then
            print_warning "GitHub CLI not found. Installing..."
            if command -v brew &> /dev/null; then
                brew install gh
            else
                print_error "Please install GitHub CLI from: https://cli.github.com"
                exit 1
            fi
        fi
        
        print_info "Launching GitHub authentication..."
        gh auth login
        print_success "GitHub CLI authentication successful"
        ;;
    
    pat)
        print_info "Using Personal Access Token..."
        read -sp "Enter your GitHub Personal Access Token: " TOKEN
        echo ""
        
        if [ -z "$TOKEN" ]; then
            print_error "No token provided"
            exit 1
        fi
        
        REMOTE_URL="https://${TOKEN}@github.com/${REPOSITORY}.git"
        git remote set-url origin "$REMOTE_URL"
        print_success "Git configured with PAT"
        ;;
    
    ssh)
        print_info "Using SSH authentication..."
        print_warning "Ensure your SSH key is added to GitHub"
        print_info "Add SSH key at: https://github.com/settings/ssh/new"
        
        REMOTE_URL="git@github.com:${REPOSITORY}.git"
        git remote set-url origin "$REMOTE_URL"
        print_success "Git configured for SSH"
        ;;
    
    *)
        print_error "Unknown authentication method: $AUTH_METHOD"
        echo "Usage: $0 [gh|pat|ssh]"
        exit 1
        ;;
esac

# Verify remote
print_header "Verifying Remote Configuration"
print_info "Remote URL:"
git remote -v

# Show commits to push
print_header "Commits to Push"
git log --oneline origin/master..master

# Push to GitHub
print_header "Pushing to GitHub"
print_info "Pushing commits to $REPOSITORY..."

if git push -u origin master; then
    print_success "Push completed successfully!"
else
    print_error "Push failed"
    exit 1
fi

# Final status
print_header "Setup Complete!"
print_success "Code pushed to GitHub"
print_info "Repository: $GITHUB_URL"
print_info "Actions: $GITHUB_URL/actions"

print_header "Next Steps"
print_info "1. Configure GitHub Secrets:"
echo "   Go to: Settings > Secrets and variables > Actions"
echo ""
print_info "2. Add these secrets:"
echo "   - DATABASE_URL"
echo "   - NEXT_PUBLIC_SITE_URL"
echo ""
print_info "3. Watch the CI/CD pipeline:"
echo "   Go to: Actions tab"
echo ""
print_info "For detailed instructions, see:"
echo "   - PUSH_TO_GITHUB.md"
echo "   - DEPLOYMENT.md"
echo "   - QUICK_REFERENCE.md"

print_header "Documentation"
echo -e "${BLUE}📄 SETUP_SUMMARY.md     - Complete setup overview${NC}"
echo -e "${BLUE}📄 PUSH_TO_GITHUB.md    - Detailed push instructions${NC}"
echo -e "${BLUE}📄 DEPLOYMENT.md        - Deployment options & guide${NC}"
echo -e "${BLUE}📄 QUICK_REFERENCE.md   - Quick commands & troubleshooting${NC}"
echo -e "${BLUE}📄 .github/SECRETS.md   - GitHub Secrets configuration${NC}"

echo -e "\n${GREEN}✨ Your VR-Tech project is ready for deployment! 🚀${NC}\n"
