# 🚀 Quick Setup Guide - Fix Authentication Issues

## 🔥 **Firebase Console Setup (Required)**

Your authentication issues are likely because these Firebase services aren't enabled yet. Follow these steps:

### 1️⃣ **Enable Email/Password Authentication**

1. Go to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
2. Click "Authentication" in left sidebar
3. Go to "Sign-in method" tab
4. Click "Email/Password" provider
5. **Toggle "Enable" ON**
6. Click "Save"

### 2️⃣ **Enable Firestore Database**

1. Go to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/firestore)
2. Click "Firestore Database" in left sidebar
3. Click "Create database"
4. Choose "Start in production mode"
5. Select a location (closest to you)
6. Click "Done"

### 3️⃣ **Verify Google Authentication**

1. Go to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
2. Make sure "Google" provider is enabled
3. If not, click "Google" and enable it
4. Select your support email and save

## 🧪 **Test the Application**

After enabling the above services:

1. **Start the app** (if not running):
   ```bash
   npm run dev
   ```

2. **Visit**: http://localhost:3003 (or whatever port it shows)

3. **Test Google Sign-in**:
    - Click "Get Started"
    - Click "Continue with Google"
    - Sign in with your Google account
    - Should redirect to dashboard

4. **Test Demo Accounts**:
    - Click "Demo Admin" button
    - Should show error: "Demo admin account not found"
    - Click "Don't have an account? Sign up"
    - Create account with: `admin@example.com` / `admin123` / `Admin User`
    - Now "Demo Admin" button should work

## 🔧 **Create Demo Accounts**

To make demo buttons work, create these accounts:

### Admin Account:

- Email: `admin@example.com`
- Password: `admin123`
- Name: `Admin User`

### User Account:

- Email: `user@example.com`
- Password: `user123`
- Name: `Regular User`

## 🚨 **Troubleshooting**

### Google Sign-in Not Redirecting:

- Check browser console for errors
- Make sure popup blockers are disabled
- Try in incognito mode

### Demo Accounts Not Working:

- Create the accounts manually first using the sign-up form
- Make sure Email/Password authentication is enabled in Firebase

### "Permission Denied" Errors:

- Make sure Firestore database is created
- Try refreshing the page

## ✅ **Expected Behavior After Setup**

1. ✅ Google sign-in works and redirects to dashboard
2. ✅ Demo buttons work after creating accounts
3. ✅ Email/password registration works
4. ✅ Profile page loads and can be edited
5. ✅ User data persists in Firestore

## 📞 **Still Having Issues?**

If you're still having problems:

1. **Check Browser Console** - Look for specific error messages
2. **Check Firebase Console** - Look at Authentication and Firestore tabs
3. **Try Different Browser** - Test in incognito mode
4. **Check Network Tab** - Look for failed API requests

The most common issue is that **Email/Password authentication** and **Firestore Database** are not enabled in your
Firebase Console. Make sure to enable both!