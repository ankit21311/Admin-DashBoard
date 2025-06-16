# Firebase Google Authentication Setup Guide

This guide will help you set up Google Authentication for your Admin Dashboard using Firebase.

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
    - Visit [Firebase Console](https://console.firebase.google.com/)
    - Click "Create a project" or "Add project"

2. **Configure Your Project**
    - Enter project name (e.g., "admin-dashboard")
    - Choose whether to enable Google Analytics (optional)
    - Click "Create project"

## Step 2: Setup Google Authentication

1. **Enable Authentication**
    - In Firebase Console, go to "Authentication"
    - Click "Get started"

2. **Configure Google Sign-in**
    - Go to "Sign-in method" tab
    - Click on "Google"
    - Enable the toggle
    - Select project support email from dropdown
    - Click "Save"

## Step 3: Get Firebase Configuration

1. **Add Web App**
    - In Firebase Console, click the Web icon (</>) to add a web app
    - Enter app name (e.g., "Admin Dashboard Web")
    - Click "Register app"

2. **Copy Configuration**
    - Copy the Firebase configuration object that appears
    - It should look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef..."
   };
   ```

## Step 4: Configure Environment Variables

Update your `.env.local` file with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...

# News API Configuration (keep existing)
NEWS_API_KEY=61e6d7b09b8c484b8fd0a206f92b1a8b

# Guardian API (optional)
GUARDIAN_API_KEY=your-guardian-api-key-here
```

## Step 5: Configure Admin Users

1. **Update Admin Emails List**
    - Open `src/contexts/AuthContext.tsx`
    - Find the `adminEmails` array
    - Add your Google account email address:

   ```typescript
   const adminEmails = [
     'admin@example.com',
     'admin@gmail.com',
     'your-email@gmail.com', // Replace with your actual Gmail
     // Add more admin emails as needed
   ];
   ```

2. **Save and restart the development server**

## Step 6: Test Google Authentication

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Test Google Sign-in:**
    - Visit `http://localhost:3000`
    - Click "Get Started"
    - Click "Continue with Google"
    - Sign in with your Google account
    - Verify you can access the dashboard

3. **Test Admin Access:**
    - If your email is in the admin list, you should see admin features
    - Try accessing `/dashboard/payouts` (admin only)

## Step 7: Configure Authorized Domains (Production)

When deploying to production:

1. **Go to Firebase Console > Authentication > Settings**
2. **Scroll to "Authorized domains"**
3. **Add your production domain:**
    - For Vercel: `your-app-name.vercel.app`
    - For custom domain: `yourdomain.com`

## Troubleshooting

### Common Issues:

1. **"auth/unauthorized-domain" error:**
    - Add your domain to authorized domains in Firebase Console
    - For localhost, `localhost` should already be included

2. **Google sign-in popup blocked:**
    - Allow popups in your browser
    - Try disabling popup blockers

3. **User not recognized as admin:**
    - Check that your email is exactly in the `adminEmails` array
    - Email comparison is case-insensitive
    - Restart the app after changing admin emails

4. **"Firebase app not initialized" error:**
    - Ensure all environment variables are set correctly
    - Variables must start with `NEXT_PUBLIC_`
    - Restart development server after adding variables

5. **Google OAuth not working:**
    - Verify Google sign-in is enabled in Firebase Console
    - Check browser developer tools for errors
    - Try in incognito mode

### Admin Features Access

Once signed in as an admin user, you'll have access to:

- ✅ **Payout Management** - Set and manage author payout rates
- ✅ **Full Analytics** - Access to all dashboard analytics
- ✅ **Export Features** - Export reports and data
- ✅ **All Articles** - View and manage all content

Regular users have access to:

- ✅ **View Articles** - Browse and search articles
- ✅ **Basic Analytics** - View dashboard statistics
- ❌ **Payout Management** - Admin only
- ❌ **Advanced Export** - Limited access

## Production Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Google authentication enabled
- [ ] Environment variables added to deployment platform
- [ ] Production domain added to Firebase authorized domains
- [ ] Admin emails configured correctly
- [ ] Google sign-in tested in production

## Security Notes

1. **Firebase Config is Safe**
    - Firebase configuration can be safely exposed in frontend
    - These are meant to be public identifiers

2. **Admin Role Management**
    - Admin detection is based on email addresses
    - For larger teams, consider Firebase Custom Claims

3. **Google Account Security**
    - Users authenticate through Google's secure OAuth flow
    - No passwords are stored in your application

---

**You're Ready!**
Follow these steps and you'll have Google authentication working with proper admin role management. The dashboard will
automatically detect admin users based on their Google account email addresses.
