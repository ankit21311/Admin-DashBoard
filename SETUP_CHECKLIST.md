# Quick Setup Checklist ✅

Your Firebase configuration has been set up! Here's what you need to do next:

## ✅ Done

- [x] Firebase project created (admin-dashboard-463118)
- [x] Firebase configuration added to .env.local
- [x] Google Authentication integrated
- [x] Development server running on http://localhost:3004

## 🔧 Next Steps

### 1. Enable Google Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
2. Click on "Authentication" in the left sidebar
3. Go to "Sign-in method" tab
4. Click on "Google" provider
5. Toggle the "Enable" switch ON
6. Select your project support email
7. Click "Save"

### 2. Configure Admin Access

1. Open `src/contexts/AuthContext.tsx`
2. Find the `adminEmails` array (around line 54)
3. Add your Gmail address:
   ```typescript
   const adminEmails = [
     'admin@example.com',
     'admin@gmail.com',
     'your-actual-email@gmail.com', // Replace with your Gmail
   ];
   ```
4. Save the file

### 3. Test the Application

1. Open http://localhost:3004 in your browser
2. Click "Get Started"
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the dashboard

### 4. Verify Admin Access (if you added your email)

- Try accessing: http://localhost:3004/dashboard/payouts
- This page should only be accessible to admin users

## 🚨 Troubleshooting

### If Google Sign-in doesn't work:

1. Check that Google authentication is enabled in Firebase Console
2. Make sure you're using the correct Firebase project
3. Check browser developer tools for errors

### If you're not recognized as admin:

1. Verify your email is exactly in the `adminEmails` array
2. Make sure the email matches your Google account email
3. Restart the development server after making changes

### If you get "unauthorized domain" error:

1. Go to Firebase Console > Authentication > Settings
2. Check "Authorized domains" section
3. Make sure `localhost` is in the list

## 🎯 Current Firebase Project Details

- **Project ID**: admin-dashboard-463118
- **Project Name**: Admin Dashboard
- **Auth Domain**: admin-dashboard-463118.firebaseapp.com
- **Console URL**: https://console.firebase.google.com/project/admin-dashboard-463118

## 📱 Test URLs

- **Home**: http://localhost:3004
- **Sign In**: http://localhost:3004/auth/signin
- **Dashboard**: http://localhost:3004/dashboard
- **Articles**: http://localhost:3004/dashboard/articles
- **Payouts** (Admin): http://localhost:3004/dashboard/payouts

---

**🚀 Ready to go!** Once you enable Google authentication in Firebase Console and add your email to the admin list,
you'll have a fully functional admin dashboard with Google authentication!