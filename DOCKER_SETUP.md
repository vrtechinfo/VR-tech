# VR Tech Info - Docker Setup Guide

## Updated Configuration

### Admin Credentials
The admin user credentials have been updated:
- **Email**: `admin@vrtech.com`
- **Password**: `vrpass@123`
- **Name**: VR Tech Admin

### Docker Compose Enhancements

The `docker-compose.yml` has been enhanced with the following features:

#### 1. **Environment Variable Support**
All configuration values now support environment variables with sensible defaults:
- `POSTGRES_USER` (default: postgres)
- `POSTGRES_PASSWORD` (default: password)
- `POSTGRES_DB` (default: vr_tech_db)
- `POSTGRES_PORT` (default: 5432)

#### 2. **Health Checks**
PostgreSQL service now includes health checks to ensure the database is ready before dependent services start.

#### 3. **Network Isolation**
Services are isolated in a dedicated bridge network (`vr-tech-network`) for better security.

#### 4. **Logging Configuration**
JSON file logging with rotation (max 10MB, 3 files) to prevent disk space issues.

#### 5. **PgAdmin Integration**
Optional PgAdmin service for database management (use `--profile tools` to enable).

## Usage

### Basic Setup (PostgreSQL only)
```bash
# Start PostgreSQL
docker-compose up -d

# View logs
docker-compose logs -f postgres

# Stop services
docker-compose down
```

### With PgAdmin (Database Management Tool)
```bash
# Start PostgreSQL + PgAdmin
docker-compose --profile tools up -d

# Access PgAdmin at http://localhost:5050
# Login with credentials from .env file
```

### Environment Variables
You can override default values by:

1. **Using .env file** (recommended for local development)
   - Copy `.env.docker.example` to `.env.docker`
   - Update values as needed
   - Docker Compose will automatically use these values

2. **Using command line**
   ```bash
   POSTGRES_PASSWORD=mypassword docker-compose up -d
   ```

### Creating Admin User
After starting the database, create the admin user:

```bash
# Install dependencies (if not already done)
npm install

# Run the admin creation script
npx tsx scripts/add-admin-direct.ts

# Verify user was created
npx tsx scripts/show-users.ts
```

### Production Deployment

For production, ensure you:

1. **Change all default passwords** in `.env` or `.env.docker`
2. **Use strong passwords** for:
   - `POSTGRES_PASSWORD`
   - `PGADMIN_PASSWORD`
   - `BETTER_AUTH_SECRET`
3. **Restrict network access** to PostgreSQL port (5432)
4. **Enable SSL/TLS** for database connections
5. **Regular backups** of the `postgres_data` volume

### Backup and Restore

#### Backup
```bash
# Backup database
docker exec vr-tech-postgres pg_dump -U postgres vr_tech_db > backup.sql

# Backup volume
docker run --rm -v vr-tech-info_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_data_backup.tar.gz -C /data .
```

#### Restore
```bash
# Restore from SQL dump
cat backup.sql | docker exec -i vr-tech-postgres psql -U postgres -d vr_tech_db

# Restore volume
docker run --rm -v vr-tech-info_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_data_backup.tar.gz -C /data
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Check PostgreSQL logs
docker-compose logs postgres

# Test connection
docker exec -it vr-tech-postgres psql -U postgres -d vr_tech_db
```

### Reset Database
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: This deletes all data)
docker volume rm vr-tech-info_postgres_data

# Start fresh
docker-compose up -d
```

## Security Notes

⚠️ **Important Security Reminders:**

1. Never commit `.env` or `.env.docker` files with production credentials
2. Use `.env.docker.example` as a template
3. Rotate passwords regularly
4. Use strong, unique passwords for each service
5. Limit network exposure in production
6. Enable SSL/TLS for all connections
7. Regular security audits and updates
