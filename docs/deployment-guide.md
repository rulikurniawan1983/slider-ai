# Slider AI - Deployment Guide

## Prerequisites
- Docker & Docker Compose
- OpenAI API Key
- Domain name (for production)

## Local Development

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your values
nano .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev
```

## Production with Docker

```bash
# Build and start all services
docker-compose up -d

# Run migrations
docker-compose exec nextjs npx prisma migrate deploy

# Generate Prisma client
docker-compose exec nextjs npx prisma generate
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| NEXTAUTH_SECRET | Secret for JWT signing | Yes |
| NEXTAUTH_URL | Application URL | Yes |
| OPENAI_API_KEY | OpenAI API key | Yes |
| REDIS_URL | Redis connection string | Yes |
| ENCRYPTION_KEY | 32-byte encryption key | Yes |
| S3_ENDPOINT | S3-compatible endpoint | Yes |
| S3_ACCESS_KEY_ID | S3 access key | Yes |
| S3_SECRET_ACCESS_KEY | S3 secret key | Yes |
| S3_BUCKET | S3 bucket name | Yes |

## Health Check

```bash
curl http://localhost:3000/api/auth/session
```

## Monitoring

- Application logs: `docker-compose logs -f nextjs`
- Database: Connect to localhost:5432
- Redis: Connect to localhost:6379
- MinIO Console: http://localhost:9001
