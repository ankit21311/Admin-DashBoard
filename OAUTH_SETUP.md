# OAuth Setup Guide - Quick Start

## Current Status

✅ **Google OAuth** - Already configured
❌ **GitHub OAuth** - Needs setup

## Required Callback URLs

### Google OAuth (Already Done)

Your Google OAuth is already configured with:

- Client ID: `382608183550-f8gaqrirrf7mm57sd9e9j546bpkjkgo7.apps.googleusercontent.com`

**Add this callback URL to your Google Cloud Console:**

```
http://localhost:3000/api/auth/callback/google
```

**For production, also add:**

```
https://your-domain.com/api/auth/callback/google
```

### GitHub OAuth (Setup Required)

1. **Go to GitHub Settings**
    - Visit: https://github.com/settings/developers
    - Click "New OAuth App"

2. **Fill in the form:**
   ```
   Application name: Admin Dashboard
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```

3. **After creating the app:**
    - Copy the Client ID
    - Generate and copy the Client Secret
    - Update your `.env.local` file:
   ```env
   GITHUB_CLIENT_ID=your-actual-client-id
   GITHUB_CLIENT_SECRET=your-actual-client-secret
   ```

4. **For production deployment, create another OAuth app or add:**
   ```
   https://your-domain.com/api/auth/callback/github
   ```

## Test Your Setup

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the application:**
   ```
   http://localhost:3000
   ```

3. **Test authentication:**
    - Click "Get Started" or go to `/auth/signin`
    - Try Google OAuth (should work)
    - Try GitHub OAuth (after setup)
    - Try demo credentials:
        - Admin: `admin@example.com` / `admin123`
        - User: `user@example.com` / `user123`

## Production Deployment

When deploying to production (e.g., Vercel):

1. **Update environment variables:**
   ```env
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

2. **Add production callback URLs:**
    - Google: `https://your-app-name.vercel.app/api/auth/callback/google`
    - GitHub: `https://your-app-name.vercel.app/api/auth/callback/github`

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error:**
    - Callback URL doesn't match exactly
    - Check for trailing slashes
    - Verify http vs https

2. **"Client does not exist" error:**
    - Wrong Client ID
    - OAuth app might be in draft mode

3. **Authentication not working:**
    - Restart development server after changing .env.local
    - Clear browser cache/cookies
    - Check browser developer tools for errors

### Quick Debug:

```bash
# Check if environment variables are loaded
# Add this to any page temporarily:
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
```

---

**Next Steps:**

1. Set up GitHub OAuth following the steps above
2. Test both OAuth providers work
3. Deploy to production with updated callback URLs