# Auto-merge all Dependabot PRs
# Usage: .\scripts\merge-prs.ps1 -Token <github-token>

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:GITHUB_TOKEN,
    
    [Parameter(Mandatory=$false)]
    [string]$Repo = "vrtechinfo/VR-tech"
)

if (-not $Token) {
    Write-Host "❌ Error: GitHub token not provided. Set GITHUB_TOKEN environment variable or pass -Token parameter" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 Fetching open pull requests from $Repo..." -ForegroundColor Cyan

$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

try {
    # Get all open PRs
    $prsResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/pulls?state=open&per_page=100" -Headers $headers
    
    if ($prsResponse.Count -eq 0) {
        Write-Host "✅ No open pull requests found!" -ForegroundColor Green
        exit 0
    }
    
    Write-Host "Found $($prsResponse.Count) open pull requests" -ForegroundColor Yellow
    
    foreach ($pr in $prsResponse) {
        $prNumber = $pr.number
        $prTitle = $pr.title
        $prAuthor = $pr.user.login
        
        Write-Host ""
        Write-Host "Processing PR #$prNumber..." -ForegroundColor Cyan
        Write-Host "  Title: $prTitle"
        Write-Host "  Author: $prAuthor"
        
        # Get commit status
        $commitSha = $pr.head.sha
        $statusResponse = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/commits/$commitSha/status" -Headers $headers
        $state = $statusResponse.state
        
        Write-Host "  Status: $state"
        
        # Auto-merge Dependabot PRs or PRs with successful status
        if ($prAuthor -eq "dependabot[bot]" -or $state -eq "success") {
            Write-Host "  ✅ Merging PR #$prNumber..." -ForegroundColor Green
            
            try {
                $mergeParams = @{
                    Uri = "https://api.github.com/repos/$Repo/pulls/$prNumber/merge"
                    Method = "PUT"
                    Headers = $headers
                    Body = @{
                        commit_title = "merge: Merge PR #$prNumber"
                        merge_method = "squash"
                    } | ConvertTo-Json
                    ContentType = "application/json"
                }
                
                $mergeResult = Invoke-RestMethod @mergeParams
                
                if ($mergeResult.merged) {
                    Write-Host "  ✅ PR #$prNumber merged successfully!" -ForegroundColor Green
                } else {
                    $errorMsg = $mergeResult.message
                    Write-Host "  ❌ Failed to merge PR #$($prNumber): $($errorMsg)" -ForegroundColor Red
                }
            }
            catch {
                Write-Host "  ❌ Error merging PR #$($prNumber): $($_)" -ForegroundColor Red
            }
        }
        else {
            Write-Host "  ⏳ PR #$prNumber checks not complete, skipping..." -ForegroundColor Yellow
        }
    }
}
catch {
    Write-Host "❌ Error fetching PRs: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Pull request processing complete!" -ForegroundColor Green
