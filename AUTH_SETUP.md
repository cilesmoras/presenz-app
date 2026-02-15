# Supabase Authentication Setup

## Overview

This project now has full authentication implemented using Supabase Auth with Next.js 14+.

## Features Implemented

- ✅ Email/Password authentication
- ✅ Google OAuth authentication (configurable)
- ✅ User signup and login pages
- ✅ Protected routes with middleware
- ✅ Server-side authentication
- ✅ Client-side authentication
- ✅ Automatic session management
- ✅ Sign out functionality

## Environment Variables Required

Create a `.env.local` file in the root of your project with the following variables:

```env
# Database URL for Drizzle ORM
DATABASE_URL=your_supabase_postgres_connection_string

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For OAuth redirects (use your actual domain in production)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Getting Your Supabase Credentials

1. Go to your [Supabase project dashboard](https://app.supabase.com)
2. Navigate to **Project Settings** > **API**
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Navigate to **Project Settings** > **Database**
5. Copy the **Connection string** (URI format) → `DATABASE_URL`
   - Make sure to replace `[YOUR-PASSWORD]` with your actual database password

## File Structure

```
app/
├── actions/
│   └── auth.ts                 # Server actions for authentication
├── auth/
│   └── callback/
│       └── route.ts            # OAuth callback handler
├── login/
│   └── page.tsx                # Login page
├── signup/
│   └── page.tsx                # Signup page
└── page.tsx                    # Protected home page

components/
├── login-form.tsx              # Login form component
└── signup-form.tsx             # Signup form component

lib/
├── supabase/
│   ├── client.ts               # Client-side Supabase client
│   ├── server.ts               # Server-side Supabase client
│   └── middleware.ts           # Session refresh middleware
└── utils.ts                    # Utility functions

middleware.ts                   # Root middleware for auth protection
```

## How It Works

### 1. Authentication Flow

- Users visit `/login` or `/signup` to create an account or sign in
- Credentials are validated through Supabase Auth
- Session cookies are automatically set
- Users are redirected to the home page upon success

### 2. Protected Routes

The middleware (`middleware.ts`) automatically:

- Checks if a user is authenticated on every request
- Refreshes session tokens when needed
- Redirects unauthenticated users to `/login`
- Allows access to `/login` and `/signup` without authentication

### 3. Server Actions

Located in `app/actions/auth.ts`:

- `login()` - Sign in with email/password
- `signup()` - Create new account
- `signOut()` - Sign out user
- `loginWithGoogle()` - OAuth with Google (requires setup)
- `getUser()` - Get current authenticated user

## Setting Up Google OAuth (Optional)

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Providers**
3. Enable **Google** provider
4. Follow Supabase's instructions to set up Google OAuth:
   - Create a Google Cloud project
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs
5. Add your Google Client ID and Secret to Supabase

The "Login with Google" button is already implemented in both login and signup forms.

## Database Schema

The Supabase Auth creates its own `auth.users` table automatically. Your custom `users` table in `db/schema.ts` can be used for additional user profile data if needed. You may want to:

1. Link it to Supabase Auth using the user's UUID
2. Create a database trigger to auto-create profile records
3. Or use Supabase's policies to manage relationships

## Testing the Authentication

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`
   - You should be redirected to `/login` (not authenticated)

3. Click "Sign up" and create a new account

4. After signup, you'll be redirected to login

5. Log in with your credentials

6. You should now see the home page with your user info and a "Sign out" button

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router with Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## Troubleshooting

### "Invalid API key" error

- Make sure your `.env.local` file has the correct Supabase credentials
- Restart your dev server after adding environment variables

### Redirecting in loops

- Check that middleware is not blocking required routes
- Ensure session cookies are being set correctly

### OAuth not working

- Verify your redirect URLs in Supabase match your application URL
- Check that the OAuth provider is properly configured in Supabase dashboard
