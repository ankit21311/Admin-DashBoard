# 📰 Admin Dashboard - News & Blog Management System

A comprehensive admin dashboard built with **Next.js**, **Firebase**, and modern UI components to manage news articles and blog posts with powerful features like analytics, payout calculations, exports, and more.

## 🌟 Live Demo
🔗 [Experience the Dashboard Now](https://admin-dashboard-0jw7.onrender.com)  (Render)
OR 
🔗 [Experience the Dashboard Now](https://adminashboard.netlify.app/)  (Netlify-Here You may face Authentication Issue)
No signup required — try out the **Demo Admin** or **Demo User** accounts on the sign-in page.

## ✨ Quick Demo Access
- **🔐 Demo Admin**: Full access (including payout management)
- **👤 Demo User**: Standard access with limited permissions  
💡 _Demo accounts provide instant access with preloaded data — no setup needed!_

---

## ✨ Features

### 🧑‍💼 Authentication
- ✅ Demo Accounts (Admin & User)
- ✅ Google OAuth Sign-In
- ✅ Email/Password (with Firebase)
- ✅ Role-Based Access Control

### 📰 News & Blog Management
- ✅ View news and blog posts (mock data)
- ✅ Filter by author, date, type
- ✅ Global Search
- ✅ Fully Responsive Layout

### 📊 Analytics Dashboard
- ✅ Content distribution, author performance charts
- ✅ Key metrics: articles, authors, payouts
- ✅ Monthly publishing trends
- ✅ Author rankings & earnings

### 💰 Payout Management (Admin Only)
- ✅ $50/article default payout (customizable)
- ✅ Inline payout editing
- ✅ Real-time calculations
- ✅ Data saved in `localStorage`

### 📤 Export & Reports
- ✅ PDF Export (via jsPDF)
- ✅ Excel Export (via SheetJS)
- ✅ Payout Reports per author
- ✅ Filter-based export

### 🎨 Modern UI/UX
- ✅ Light/Dark Theme with persistence
- ✅ Mobile-first responsive design
- ✅ Skeleton loaders, toasts, smooth animations
- ✅ Radix UI + Tailwind CSS components

---

## 🛠 Tech Stack

| Tech            | Usage                                   |
|-----------------|-----------------------------------------|
| **Next.js**     | React Framework                         |
| **TypeScript**  | Type Safety                             |
| **Tailwind CSS**| UI Styling                              |
| **Radix UI**    | Accessible UI Components                |
| **Redux Toolkit** | State Management                     |
| **Chart.js**    | Data Visualization                      |
| **Firebase Auth**| Authentication                        |
| **jsPDF / SheetJS**| Export Features                     |
| **Lucide Icons**| Icon Library                            |
| **Render**      | Deployment                              |

---

## 🚀 Quick Start

### Option 1: Try the Live Demo
Visit: [https://admin-dashboard-0jw7.onrender.com](https://admin-dashboard-0jw7.onrender.com)  
Click **"Demo Admin"** or **"Demo User"** and start exploring!

### Option 2: Run Locally
Visit: [https://admin-dashboard-0jw7.onrender.com](https://adminashboard.netlify.app/)  

### Option 3: Run Locally
```bash
# Clone the repo
git clone https://github.com/ankit21311/Admin-DashBoard.git
cd Admin-DashBoard

# Install dependencies
npm install

# Optional: Set up environment variables
cp .env.local.example .env.local

# Start the development server
npm run dev
# Visit http://localhost:3000
