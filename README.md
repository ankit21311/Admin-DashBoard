# Admin Dashboard - News & Blog Management System

A comprehensive admin dashboard built with Next.js, Firebase, and modern UI components for managing news articles and
blog posts with analytics, payout calculations, and export features.

## 🚀 **Demo Access - No Setup Required!**

### **Instant Demo Accounts**

Experience the full dashboard immediately with our demo accounts:

- **🔐 Demo Admin**: Full access to all features including payout management
- **👤 Demo User**: Standard user access with limited permissions

**Simply click the "Demo Admin" or "Demo User" buttons on the sign-in page!**

> Demo sessions last 24 hours and work completely offline - no Firebase configuration needed.

## ✨ **Features**

### 🧑‍💼 **Authentication**

- ✅ **Demo Accounts** - Instant access without any setup
- ✅ **Google OAuth** - Sign in with Google account
- ✅ **Email/Password** - Traditional authentication (requires Firebase setup)
- ✅ **Role-based Access Control** - Admin vs User permissions

### 📰 **News & Blog Management**

- ✅ **Article Display** - View news articles and blog posts
- ✅ **Advanced Filtering** - Filter by author, date range, type
- ✅ **Global Search** - Search across all article fields
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### 📊 **Analytics Dashboard**

- ✅ **Interactive Charts** - Content distribution, author performance
- ✅ **Key Metrics** - Total articles, authors, payouts
- ✅ **Growth Trends** - Monthly publication analytics
- ✅ **Author Rankings** - Top performers and earnings

### 💰 **Payout Management** (Admin Only)

- ✅ **Automatic Calculation** - Default $50 per article
- ✅ **Inline Editing** - Adjust payout rates per author
- ✅ **Real-time Updates** - Instant total calculations
- ✅ **Persistent Storage** - Rates saved in localStorage

### 📤 **Export & Reports**

- ✅ **PDF Export** - Generate article reports via jsPDF
- ✅ **Excel Export** - Export data via SheetJS
- ✅ **Payout Reports** - Separate author compensation reports
- ✅ **Filtered Exports** - Export current filtered data

### 🎨 **Modern UI/UX**

- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Responsive Layout** - Mobile-first design approach
- ✅ **Loading States** - Skeleton loaders and animations
- ✅ **Toast Notifications** - User feedback for all actions

## 🛠 **Tech Stack**

- **Frontend**: Next.js 14.0.4, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/UI
- **Charts**: Chart.js, React-Chartjs-2
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Export**: jsPDF, SheetJS (XLSX)
- **Icons**: Lucide React

## 🚀 **Quick Start**

### **Option 1: Demo Mode (Recommended)**

1. Visit the application
2. Click "Demo Admin" or "Demo User" on the sign-in page
3. Start exploring immediately!

### **Option 2: Full Setup**

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase (optional - for Google auth and real user accounts)
4. Configure environment variables
5. Run development server: `npm run dev`

## 🔧 **Configuration**

### **Environment Variables**

```env
# Firebase (Optional - for Google auth)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config

# News API (Optional - uses mock data if not provided)
NEWS_API_KEY=your_news_api_key
```

### **Admin Configuration**

To grant admin access to additional users, update the admin email list in:

```typescript
// src/contexts/AuthContext.tsx
const adminEmails = [
    'admin@example.com',
    'your-email@gmail.com', // Add your email here
    // Add more admin emails...
];
```

## 📱 **Features Overview**

### **Dashboard Pages**

- **🏠 Dashboard** - Overview with charts and key metrics
- **📄 Articles** - Article management with filtering and search
- **📊 Analytics** - Detailed analytics and performance insights
- **💰 Payouts** - Author compensation management (Admin only)
- **📋 Reports** - Export functionality for data and reports
- **👤 Profile** - User profile management
- **⚙️ Settings** - App configuration and preferences

### **Demo Data**

The application includes realistic mock data:

- **Sample Articles** - Mix of news articles and blog posts
- **Multiple Authors** - Various contributors with different article counts
- **Payout Information** - Pre-configured payout rates and calculations
- **Analytics Data** - Simulated performance metrics and trends

## 🎯 **User Roles**

### **Admin Users**

- Full access to all features
- Payout management capabilities
- Export and reporting functions
- User management (future feature)

### **Standard Users**

- View articles and analytics
- Personal profile management
- Limited export capabilities
- No payout management access

## 🔒 **Security Features**

- **Role-based Access Control** - Feature restrictions based on user role
- **Session Management** - Secure session handling
- **Input Validation** - Form validation and sanitization
- **Error Handling** - Graceful error management with user feedback

## 📦 **Deployment**

The application is ready for deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **Any Node.js hosting platform**

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (especially demo functionality)
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

---

**🎉 Try the demo now - no setup required! Just click "Demo Admin" or "Demo User" on the sign-in page.**
