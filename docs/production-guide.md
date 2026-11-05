# Slider AI - Production Guide

## Database Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Prisma Studio

```bash
npx prisma studio
```

## Building for Production

```bash
npm run build
npm start
```

## Scaling Considerations

1. **Database**: Use connection pooling (PgBouncer) for high concurrency
2. **Redis**: Use Redis Cluster for caching and rate limiting
3. **S3**: Use AWS S3 or compatible storage for file uploads
4. **Next.js**: Deploy on Vercel or Kubernetes with horizontal scaling

## Monitoring

- Application performance: Vercel Analytics or OpenTelemetry
- Error tracking: Sentry
- Database: pgAdmin or similar
- Uptime: Health check endpoint at /api/auth/session

## Backup

- PostgreSQL: `pg_dump` regular backups
- S3: Versioning enabled
- Redis: AOF persistence
