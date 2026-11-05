# Slider AI - Authentication Flow

## Login Flow
1. User navigates to /auth/signin
2. User submits email and password
3. Frontend calls NextAuth credentials provider
4. Server validates credentials against database
5. Password compared using bcrypt
6. JWT token issued with user id and role
7. Session cookie set (httpOnly, secure)
8. User redirected to /dashboard

## Session Flow
1. Client request includes session cookie
2. Middleware validates JWT token
3. Token decoded and user info attached to request
4. Protected routes check user role
5. Expired tokens redirect to /auth/signin

## Registration Flow
1. User navigates to /auth/register
2. User submits registration form
3. User created in database with hashed password
4. Default workspace created for user
5. Built-in agents initialized in workspace
6. Auto-sign in after registration

## Logout Flow
1. User clicks logout
2. Session cookie cleared
3. Redirect to /auth/signin

## Protected Routes
- /dashboard - Requires authentication
- /chat/* - Requires authentication
- /agents/* - Requires authentication
- /documents/* - Requires authentication
- /settings/* - Requires authentication
- /admin/* - Requires SUPER_ADMIN or ADMIN role
