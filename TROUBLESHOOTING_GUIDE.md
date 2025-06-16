# Troubleshooting Guide - Common Development Issues

## 🚨 **Turbopack Cache Error**

### Error Message:

```
Error: Cannot find module '../chunks/ssr/[turbopack]_runtime.js'
```

### Solution:

This error occurs due to corrupted build cache or Turbopack configuration issues. Follow these steps:

1. **Clear Next.js Cache**:
   ```bash
   rm -rf .next
   # On Windows:
   rmdir /s .next
   ```

2. **Clear Node Modules** (if needed):
   ```bash
   rm -rf node_modules
   npm install
   # On Windows:
   rmdir /s node_modules
   npm install
   ```

3. **Clean Build**:
   ```bash
   npm run build
   ```

4. **Restart Development Server**:
   ```bash
   npm run dev
   ```

### Alternative Solutions:

1. **Disable Turbopack** (temporary fix):
   ```bash
   npm run dev -- --no-turbo
   ```

2. **Update Next.js**:
   ```bash
   npm update next
   ```

## 🔄 **Authentication Issues**

### Google Sign-in Not Working:

1. **Check Firebase Console**:
    - Ensure Google authentication is enabled
    - Verify authorized domains include your localhost

2. **Environment Variables**:
    - Check all Firebase environment variables are set
    - Restart development server after changes

3. **Clear Browser Cache**:
    - Try incognito mode
    - Clear cookies and local storage

### Demo Accounts Not Working:

1. **Create Demo Accounts**:
    - Use the sign-up form to create `admin@example.com` and `user@example.com`
    - Enable Email/Password authentication in Firebase Console

2. **Admin Access Issues**:
    - Update `src/contexts/AuthContext.tsx` with your email address
    - Check the `adminEmails` array

## 🏗️ **Build Issues**

### TypeScript Errors:

1. **Update TypeScript Config**:
   ```json
   {
     "compilerOptions": {
       "target": "es2015",
       "downlevelIteration": true
     }
   }
   ```

2. **Check Dependencies**:
   ```bash
   npm list --depth=0
   ```

### Performance Issues:

1. **Lazy Load Components**:
    - Charts are already lazy-loaded using `dynamic` imports
    - Consider lazy loading other heavy components

2. **Optimize Images**:
    - Use Next.js Image component
    - Configure image domains in `next.config.js`

## 🌐 **Development Server Issues**

### Port Already in Use:

1. **Kill Process**:
   ```bash
   # Find process using port 3000
   lsof -ti:3000 | xargs kill -9
   # On Windows:
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

2. **Use Different Port**:
   ```bash
   npm run dev -- -p 3001
   ```

### Slow Performance:

1. **Check File Watchers**:
    - Exclude `.next` and `node_modules` from file watchers
    - Use `.gitignore` to exclude unnecessary files

2. **Disable Source Maps** (development):
   ```javascript
   // next.config.js
   module.exports = {
     productionBrowserSourceMaps: false,
     webpack: (config, { dev }) => {
       if (dev) {
         config.devtool = 'cheap-module-source-map';
       }
       return config;
     },
   };
   ```

## 🔧 **Common Commands**

### Full Reset:

```bash
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Build Check:

```bash
npm run build
npm run lint
```

### Environment Check:

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check Next.js version
npx next --version
```

## 📞 **Getting Help**

1. **Check Browser Console** for specific error messages
2. **Check Terminal Output** for build/server errors
3. **Test Pages**:
    - `/test-auth` - Authentication testing
    - `/firebase-check` - Firebase configuration check
4. **Verify Firebase Setup** in console
5. **Check Network Tab** for failed API requests

## 🚀 **Quick Fixes**

### Most Common Issues:

1. ✅ **Clear `.next` cache** - Fixes most build issues
2. ✅ **Enable Firebase services** - Fixes authentication issues
3. ✅ **Check environment variables** - Fixes configuration issues
4. ✅ **Restart development server** - Fixes hot reload issues
5. ✅ **Clear browser cache** - Fixes client-side issues

---

**💡 Pro Tip**: Keep the development server running and only restart when absolutely necessary. Most issues can be
resolved by clearing caches and ensuring proper configuration.