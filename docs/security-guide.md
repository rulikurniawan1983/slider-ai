# Slider AI - Security Guide

## Authentication
- Auth.js (NextAuth) with JWT strategy
- Sessions expire after 30 days
- Password hashing with bcryptjs (12 salt rounds)
- CSRF protection enabled via NextAuth

## Authorization
- Role-based access control (RBAC): SUPER_ADMIN, ADMIN, USER
- Admin routes protected by middleware
- API routes validate user session

## Data Encryption
- API keys encrypted with AES-256-GCM
- Encryption key stored in ENCRYPTION_KEY env variable
- HTTPS required in production

## Input Validation
- Zod schemas for all API inputs
- SQL injection prevention via Prisma ORM
- XSS protection via rehype-sanitize for markdown content

## Rate Limiting
- Redis-based rate limiting (implement in middleware)
- Auth attempts rate limited

## Secrets Management
- Never commit .env files
- Use Docker secrets or environment variables in production
- Rotate NEXTAUTH_SECRET and ENCRYPTION_KEY periodically

## Security Headers
Configure in next.config.js:
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## Audit Logging
- All admin actions logged to AuditLog table
- User actions tracked with IP and user agent
- Soft delete for data recovery
