# Admin Login Troubleshooting Guide

## Problem: "An unexpected error occurred. Please try again."

This error message typically indicates one of the following issues:

### 1. Database Connection Issues

**Symptoms:**
- Login fails with a generic error
- Error appears immediately when clicking "Sign In"

**Diagnosis:**
1. Check the diagnostic endpoint: `https://vrtechinfo.ca/api/debug/auth-status`
2. Look for database connection errors in server logs

**Solutions:**
- Verify `DATABASE_URL` is set correctly in environment variables
- Ensure the database server is running and accessible
- For production: Verify SSL certificate settings and network connectivity
- Check database firewall rules and connection limits

**Example DATABASE_URL format:**
```
postgresql://username:password@host:port/database_name
```

### 2. Missing Database Tables

**Symptoms:**
- Login fails but database connection is working
- Auth status endpoint shows missing "user", "account", "session", or "verification" tables

**Solutions:**
1. Run the migration to create tables:
   ```bash
   npm run migrate
   ```

2. Or manually run the SQL migration from `migrations/004_better_auth_tables.sql`

3. Verify tables are created:
   ```bash
   psql $DATABASE_URL -f migrations/004_better_auth_tables.sql
   ```

### 3. Missing Environment Variables

**Required Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for signing tokens (generate one if missing)
- `NEXT_PUBLIC_APP_URL` - Application URL (e.g., https://vrtechinfo.ca)

**Solutions:**
1. Create/update `.env.local` with all required variables
2. For production, set environment variables in your hosting platform:
   - Vercel: Settings > Environment Variables
   - Docker: Use `.env.docker` or docker-compose environment section
   - Self-hosted: Update system environment variables

### 4. No Admin User in Database

**Symptoms:**
- Database and tables exist, but login always fails
- Auth status endpoint shows `usersCount: 0`

**Solutions:**
1. Create an admin user using the script:
   ```bash
   npm run create-admin
   ```

2. Or use the initialization API:
   ```bash
   curl -X POST https://vrtechinfo.ca/api/create-admin
   ```

3. Set these environment variables first:
   ```
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=YourSecurePassword123!
   ADMIN_NAME=Admin Name
   ```

### 5. BETTER_AUTH_SECRET Not Set

**Symptoms:**
- Authentication works sometimes but fails unexpectedly
- Session tokens are invalid

**Solutions:**
1. Generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Add to environment variables:
   ```
   BETTER_AUTH_SECRET=<generated-value>
   ```

3. **Important**: All instances must use the same secret for tokens to be valid

### 6. CORS/CSRF Issues

**Symptoms:**
- Request fails before reaching the server
- Errors in browser console about CORS

**Solutions:**
1. Ensure `NEXT_PUBLIC_APP_URL` matches your domain:
   ```
   NEXT_PUBLIC_APP_URL=https://vrtechinfo.ca
   ```

2. Verify cookies are allowed:
   - Check browser privacy settings
   - Ensure site is not in private/incognito mode
   - Clear browser cookies and cache

## Debugging Steps

### 1. Check Diagnostic Endpoint
```bash
curl https://your-domain.com/api/debug/auth-status | jq .
```

### 2. View Server Logs
```bash
# For Next.js development
npm run dev

# For production (Docker)
docker-compose logs app

# For self-hosted (PM2)
pm2 logs vr-tech-app
```

### 3. Test Database Connection
```bash
psql $DATABASE_URL -c "SELECT * FROM \"user\""
```

### 4. Test Auth Tables
```bash
psql $DATABASE_URL -f migrations/004_better_auth_tables.sql
```

## Production Checklist

- [ ] DATABASE_URL is set and database is accessible
- [ ] All auth tables are created
- [ ] At least one admin user exists
- [ ] BETTER_AUTH_SECRET is set to a secure random value
- [ ] NEXT_PUBLIC_APP_URL matches your production domain
- [ ] SSL/TLS certificate is valid (for HTTPS)
- [ ] Node environment is set to 'production'
- [ ] Database backups are configured
- [ ] Server logs are being monitored

## Common Commands

### Create Admin User
```bash
ADMIN_EMAIL=admin@vrtech.com ADMIN_PASSWORD=SecurePassword123! npm run create-admin
```

### Reset Admin Password
```bash
npm run update-admin-password
```

### Check Admin Users
```bash
npm run check-admin
```

### Database Diagnostics
```bash
npm run diagnose-db
```

## Logs to Check

- **Next.js Logs**: Look for "AUTH POST ERROR" or "BETTER-AUTH" messages
- **Database Logs**: Check PostgreSQL logs for connection issues
- **Browser Console**: Check for network errors or CORS issues
- **Network Tab**: Verify API calls are reaching `/api/auth/signin`

## Getting Help

1. Check the diagnostic endpoint first: `/api/debug/auth-status`
2. Review server logs for specific error messages
3. Verify all environment variables are set
4. Ensure database tables exist and are properly initialized
5. Test with a fresh admin user creation

---

**Last Updated:** 2025-01-24
