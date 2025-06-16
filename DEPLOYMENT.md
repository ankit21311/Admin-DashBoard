# Deployment Guide - Admin Dashboard

This guide will help you deploy the Admin Dashboard with proper OAuth configuration.

## OAuth Setup

### Google OAuth Configuration

1. **Go to Google Cloud Console**
    - Visit [Google Cloud Console](https://console.cloud.google.com/)
    - Select your project or create a new one

2. **Enable Google+ API**
    - Go to "APIs & Services" > "Library"
    - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
    - Go to "APIs & Services" > "Credentials"
    - Click "Create Credentials" > "OAuth 2.0 Client IDs"
    - Choose "Web application"

4. **Configure Authorized Redirect URIs**

   **For Local Development:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

   **For Production (Vercel):**
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

   **For Production (Custom Domain):**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

5. **Get Credentials**
    - Copy the Client ID and Client Secret
    - Add them to your `.env.local` file

### GitHub OAuth Configuration

1. **Go to GitHub Settings**
    - Visit [GitHub Developer Settings](https://github.com/settings/developers)
    - Click "New OAuth App"

2. **Configure OAuth App**
    - **Application name:** Admin Dashboard
    - **Homepage URL:** `http://localhost:3000` (for development)
    - **Authorization callback URL:**

   **For Local Development:**
   ```
   http://localhost:3000/api/auth/callback/github
   ```

   **For Production (Vercel):**
   ```
   https://your-app-name.vercel.app/api/auth/callback/github
   ```

   **For Production (Custom Domain):**
   ```
   https://yourdomain.com/api/auth/callback/github
   ```

3. **Get Credentials**
    - Copy the Client ID and Client Secret
    - Add them to your `.env.local` file

## Environment Variables Setup

Create a `.env.local` file in your project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth  
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# News APIs (Optional - uses mock data if not provided)
NEWS_API_KEY=your-newsapi-key
GUARDIAN_API_KEY=your-guardian-api-key
```

## Deployment Options

### 1. Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
    - Go to [Vercel](https://vercel.com)
    - Import your GitHub repository
    - Vercel will automatically detect it's a Next.js project

3. **Set Environment Variables in Vercel**
    - Go to your project settings in Vercel
    - Add all environment variables from `.env.local`
    - **Important:** Update `NEXTAUTH_URL` to your production URL:
      ```
      NEXTAUTH_URL=https://your-app-name.vercel.app
      ```

4. **Update OAuth Callback URLs**
    - Add production callback URLs to Google and GitHub OAuth apps
    - Google: `https://your-app-name.vercel.app/api/auth/callback/google`
    - GitHub: `https://your-app-name.vercel.app/api/auth/callback/github`

### 2. Manual Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add GITHUB_CLIENT_ID
   vercel env add GITHUB_CLIENT_SECRET
   vercel env add NEWS_API_KEY
   vercel env add GUARDIAN_API_KEY
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist

- [ ] Verify OAuth login works with Google
- [ ] Verify OAuth login works with GitHub
- [ ] Test credential login (admin@example.com / admin123)
- [ ] Verify news API integration
- [ ] Test dark mode functionality
- [ ] Test export functionality (PDF/Excel)
- [ ] Test payout management (admin only)
- [ ] Verify responsive design on mobile
- [ ] Check all navigation links work
- [ ] Test filtering and search functionality

## Troubleshooting

### Common OAuth Issues

1. **"redirect_uri_mismatch" Error**
    - Check that callback URLs match exactly in OAuth provider settings
    - Ensure no trailing slashes
    - Verify HTTP vs HTTPS

2. **"Invalid Client" Error**
    - Verify Client ID and Secret are correct
    - Check environment variables are properly set
    - Ensure OAuth app is not in testing mode (for Google)

3. **NextAuth Session Issues**
    - Verify NEXTAUTH_URL matches your deployment URL
    - Check NEXTAUTH_SECRET is set and secure
    - Clear browser cookies and try again

### Environment Variable Issues

1. **Variables Not Loading**
    - Restart development server after adding variables
    - Check file is named `.env.local` exactly
    - Verify variables don't have spaces around `=`

2. **Production Variables**
    - Set all variables in your deployment platform
    - Redeploy after adding variables
    - Check deployment logs for missing variables

## Security Considerations

1. **NEXTAUTH_SECRET**
    - Use a strong, random secret (32+ characters)
    - Different secret for each environment
    - Never commit secrets to version control

2. **OAuth Credentials**
    - Restrict OAuth app domains in production
    - Regularly rotate credentials
    - Monitor OAuth app usage

3. **API Keys**
    - Use environment variables only
    - Implement rate limiting
    - Monitor API usage

## Performance Optimization

1. **Lighthouse Scores**
    - The app is optimized for 90+ scores
    - Images are optimized
    - Lazy loading implemented
    - Minimal bundle size

2. **Caching**
    - News data cached in Redux
    - Theme preferences cached in localStorage
    - Payout data persisted locally

3. **Loading States**
    - Skeleton screens implemented
    - Loading indicators for all async operations
    - Error boundaries for graceful failures

---

**Need Help?**

- Check the main README.md for detailed setup instructions
- Review the troubleshooting section above
- Contact support if issues persist