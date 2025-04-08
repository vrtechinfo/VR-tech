// Simple in-memory rate limiter for form submissions
// In a production environment with multiple servers, 
// you would use a shared store like Redis for this

// Store the last submission times by identifier (email)
const lastSubmissionTimes = new Map<string, number>();

// Rate limit duration in milliseconds (5 minutes = 5 * 60 * 1000)
const RATE_LIMIT_DURATION = 5 * 60 * 1000;

/**
 * Check if a submission should be rate limited
 * @param identifier The unique identifier (email) for the user
 * @param bypassLimit Optional: Set to true to bypass the rate limit check but still record the submission
 * @returns Object containing whether the submission is allowed and how many seconds remain until next allowed submission
 */
export function checkRateLimit(identifier: string, bypassLimit = false): { 
  allowed: boolean;
  remainingSeconds: number;
} {
  const now = Date.now();
  const lastSubmission = lastSubmissionTimes.get(identifier);
  
  // If no previous submission or if bypassing the limit, allow and record submission time
  if (!lastSubmission || bypassLimit) {
    lastSubmissionTimes.set(identifier, now);
    return { allowed: true, remainingSeconds: 0 };
  }
  
  // Calculate time elapsed since last submission
  const elapsedMs = now - lastSubmission;
  
  // Check if enough time has elapsed
  if (elapsedMs >= RATE_LIMIT_DURATION) {
    // Update last submission time
    lastSubmissionTimes.set(identifier, now);
    return { allowed: true, remainingSeconds: 0 };
  }
  
  // Calculate remaining seconds
  const remainingMs = RATE_LIMIT_DURATION - elapsedMs;
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  
  return { 
    allowed: false,
    remainingSeconds 
  };
}

/**
 * Format the remaining time in a human-readable format
 * @param seconds Total seconds remaining
 * @returns Formatted string like "4 minutes and 30 seconds"
 */
export function formatRemainingTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }
  
  return `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
}
