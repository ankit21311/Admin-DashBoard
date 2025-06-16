# 🔧 Authentication Troubleshooting Guide

## 🚨 **Common Issues & Solutions**

### Issue 1: Google Sign-in Not Redirecting to Dashboard

**Symptoms:**

- Google sign-in popup works
- User gets signed in successfully
- But doesn't redirect to dashboard
- Stays on sign-in page

**Solution:**

1. **Check Firebase Console**:
    - Go
      to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
    - Ensure Google provider is **enabled**
    - Make sure your domain is in authorized domains

2. **Test Authentication Flow**:
    - Visit: `http://localhost:3003/test-auth`
    - Click "Test Google Auth"
    - Check browser console for errors

3. **Check Browser Console**:
    - Open Developer Tools (F12)
    - Look for error messages during sign-in

### Issue 2: Demo Account Buttons Not Working

**Symptoms:**

- Clicking "Demo Admin" or "Demo User" shows error
- "Demo account not found" message

**Solution:**

1. **Create Demo Accounts First**:
    - Go to sign-in page
    - Toggle to "Sign Up"
    - Create account: `admin@example.com` / `admin123` / `Admin User`
    - Create account: `user@example.com` / `user123` / `Regular User`

2. **Enable Email/Password Authentication**:
    - Go
      to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
    - Click "Email/Password" provider
    - Toggle "Enable" **ON**
    - Click "Save"

### Issue 3: "Permission Denied" or Firestore Errors

**Symptoms:**

- Authentication works but profile page fails
- Console shows Firestore permission errors
- User data not saving

**Solution:**

1. **Create Firestore Database**:
    - Go to [Firebase Console](https://console.firebase.google.com/project/admin-dashboard-463118/firestore)
    - Click "Create database"
    - Choose "Start in production mode"
    - Select your region
    - Click "Done"

2. **Update Firestore Rules** (if needed):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🧪 **Testing Steps**

### Step 1: Check Firebase Configuration

Visit: `http://localhost:3003/firebase-check`

Should show:

- ✅ All environment variables set
- ✅ Auth initialized successfully
- ✅ Firestore initialized successfully

### Step 2: Test Authentication

Visit: `http://localhost:3003/test-auth`

Test in this order:

1. **Create Demo Account** (if needed)
2. **Test Email Auth**
3. **Test Google Auth**

### Step 3: Test Full Flow

1. Go to `http://localhost:3003`
2. Click "Get Started"
3. Try Google sign-in
4. Should redirect to dashboard
5. Click "Profile" in sidebar
6. Try editing profile information

## 🔍 **Debugging Tools**

### Browser Developer Tools

1. **Console Tab**: Look for JavaScript errors
2. **Network Tab**: Check for failed API requests
3. **Application Tab**: Check Firebase connection status

### Firebase Console

1. **Authentication Tab**: Check sign-in methods and users
2. **Firestore Tab**: Check database creation and rules
3. **Project Settings**: Verify configuration

### Test Pages

- `/test-auth` - Test authentication functions
- `/firebase-check` - Check Firebase configuration

## 📋 **Quick Checklist**

Before reporting issues, verify:

- [ ] Firebase Email/Password authentication is **enabled**
- [ ] Firestore Database is **created**
- [ ] Google authentication is **enabled**
- [ ] Demo accounts are **created** (if using demo buttons)
- [ ] No JavaScript errors in browser console
- [ ] Firebase configuration is correct in `.env.local`

## 🛠️ **Firebase Console Links**

Quick access to fix common issues:

- [Authentication Methods](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/providers)
- [Firestore Database](https://console.firebase.google.com/project/admin-dashboard-463118/firestore)
- [Project Settings](https://console.firebase.google.com/project/admin-dashboard-463118/settings/general)
- [Users List](https://console.firebase.google.com/project/admin-dashboard-463118/authentication/users)

## 🚀 **Expected Working Flow**

After setup, this should work:

1. **Google Sign-in**:
    - Click "Continue with Google" → Sign in → Redirect to dashboard

2. **Email Sign-in**:
    - Enter credentials → Sign in → Redirect to dashboard

3. **Demo Buttons**:
    - Click "Demo Admin" → Instant sign-in → Redirect to dashboard

4. **Profile Management**:
    - Click "Profile" → View/edit information → Save changes

## 🆘 **Still Having Issues?**

If authentication still doesn't work:

1. **Check Browser Console** for specific error messages
2. **Try Incognito Mode** to rule out browser cache issues
3. **Try Different Browser** to rule out browser-specific issues
4. **Check Network Tab** for failed API requests
5. **Clear Browser Cache** and try again

Most issues are resolved by:

1. ✅ Enabling Email/Password authentication in Firebase
2. ✅ Creating the Firestore database
3. ✅ Creating demo accounts manually first

The app is designed to work even if Firestore fails, so authentication should work regardless of database issues.