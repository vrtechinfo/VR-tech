#!/bin/bash
# Auto-merge all Dependabot PRs

# Set GitHub token from environment or parameter
GITHUB_TOKEN="${GITHUB_TOKEN:?GitHub token not set}"
REPO="vrtechinfo/VR-tech"

echo "🔄 Fetching open pull requests..."

# Get all open PRs
PRS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO/pulls?state=open&per_page=100" | \
  jq -r '.[] | .number')

if [ -z "$PRS" ]; then
  echo "✅ No open pull requests found!"
  exit 0
fi

echo "Found PRs: $PRS"

for PR in $PRS; do
  echo ""
  echo "Processing PR #$PR..."
  
  # Get PR details
  PR_DATA=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/pulls/$PR")
  
  PR_TITLE=$(echo $PR_DATA | jq -r '.title')
  PR_AUTHOR=$(echo $PR_DATA | jq -r '.user.login')
  
  echo "  Title: $PR_TITLE"
  echo "  Author: $PR_AUTHOR"
  
  # Check if all checks passed
  CHECKS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/commits/$(echo $PR_DATA | jq -r '.head.sha')/status")
  
  STATE=$(echo $CHECKS | jq -r '.state')
  echo "  Status: $STATE"
  
  # Merge if status is success or if it's a Dependabot PR (auto-merge)
  if [ "$PR_AUTHOR" == "dependabot[bot]" ] || [ "$STATE" == "success" ]; then
    echo "  ✅ Merging PR #$PR..."
    
    MERGE_RESULT=$(curl -s -X PUT \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/$REPO/pulls/$PR/merge" \
      -d '{"commit_title":"merge: Merge PR #'$PR'","merge_method":"squash"}')
    
    if echo $MERGE_RESULT | jq -e '.merged' > /dev/null 2>&1; then
      echo "  ✅ PR #$PR merged successfully!"
    else
      ERROR=$(echo $MERGE_RESULT | jq -r '.message')
      echo "  ❌ Failed to merge PR #$PR: $ERROR"
    fi
  else
    echo "  ⏳ PR #$PR checks not complete, skipping..."
  fi
done

echo ""
echo "✅ Pull request processing complete!"
