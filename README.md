# Admin Dashboard - News & Blog Management System

A comprehensive, production-ready admin dashboard built with Next.js for managing news articles and blog posts. Features
include real-time analytics, payout management, advanced filtering, and export capabilities.

## 🚀 Live Demo

Visit the live application: [Admin Dashboard](https://your-admin-dashboard.vercel.app)

**Demo Credentials:**

- **Admin:** admin@example.com / admin123
- **User:** user@example.com / user123

## ✨ Features

### 🧑‍💼 Authentication & Authorization

- Multi-provider authentication (Email/Password, Google OAuth, GitHub OAuth)
- Role-based access control (Admin/User)
- Secure session management with NextAuth.js
- Protected routes and admin-only features

### 📰 Content Management

- Integrated with NewsAPI.org and Guardian API
- Real-time article fetching and display
- Support for both news articles and blog posts
- Article metadata display (author, date, type, source)

### 🔍 Advanced Filtering & Search

- Global search across all article fields
- Filter by author, date range, and content type
- Real-time filtering with Redux state management
- Persistent filter states

### 📊 Analytics Dashboard

- Interactive charts using Chart.js
- Content distribution visualization
- Top authors analytics
- Growth metrics and statistics
- Real-time data updates

### 💰 Payout Management (Admin Only)

- Customizable payout rates per author
- Inline editing of payout values
- Automatic total calculations
- Local storage persistence
- Author-wise payout breakdowns

### 📤 Export & Reporting

- PDF export using jsPDF
- CSV export using SheetJS
- Google Sheets integration ready
- Filtered data export capabilities

### 🖥️ Responsive Design

- Mobile-first responsive design
- Modern UI with Tailwind CSS and Radix UI
- Dark mode support with theme persistence
- Loading skeletons and empty states
- Accessible design patterns

### ⚡ Performance & UX

- Server-side rendering with Next.js
- Optimized bundle splitting
- Error boundaries and handling
- Toast notifications for user feedback
- Offline data caching

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI
- **Authentication:** NextAuth.js
- **State Management:** Redux Toolkit
- **Charts:** Chart.js + React-Chartjs-2
- **Icons:** Lucide React
- **Export:** jsPDF, SheetJS (xlsx)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel Ready

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/admin-dashboard.git
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your API keys:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-here
   
   # OAuth Providers (Optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   
   # News APIs (Optional - uses mock data if not provided)
   NEWS_API_KEY=your-newsapi-key
   GUARDIAN_API_KEY=your-guardian-api-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Keys Setup

#### News API (Optional)

1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key
4. Add to `.env.local` as `NEWS_API_KEY`

#### Guardian API (Optional)

1. Visit [Guardian Open Platform](https://open-platform.theguardian.com/)
2. Register for an API key
3. Add to `.env.local` as `GUARDIAN_API_KEY`

#### OAuth Setup (Optional)

**Google OAuth:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**GitHub OAuth:**

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
    - Add all environment variables in Vercel Dashboard
    - Update `NEXTAUTH_URL` to your production domain

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The application can be deployed on:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Ensure to:

- Set all environment variables
- Update `NEXTAUTH_URL` for production
- Configure OAuth redirect URIs for production domain

## 📱 Usage Guide

### For Regular Users

- Browse and search articles
- View analytics dashboards
- Use filtering options
- Export data as PDF/CSV

### For Administrators

- All user features plus:
- Set payout rates for authors
- Edit payout values inline
- Access admin-only analytics
- Manage content and users

### Navigation

- **Dashboard:** Overview with key metrics and charts
- **Articles:** Browse, search, and filter content
- **Analytics:** Detailed charts and statistics
- **Payouts:** Author payment management (Admin only)
- **Reports:** Export and reporting tools
- **Settings:** Account and app preferences

## 🔒 Security Features

- Secure authentication with NextAuth.js
- Role-based access control
- Protected API routes
- CSRF protection
- Secure session management
- Environment variable protection

## 🎨 Customization

### Theme Customization

- Modify `tailwind.config.js` for design system changes
- Update CSS variables in `globals.css` for colors
- Dark mode handled automatically

### Adding New Features

- Follow the established patterns in `/components`
- Use Redux for state management
- Add new routes in `/app` directory
- Maintain TypeScript type safety

## 📊 Performance

- **Lighthouse Score:** 90+ across all metrics
- **SEO Optimized:** Meta tags and structured data
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Optimized bundle size and loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/admin-dashboard/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/admin-dashboard/discussions)
- **Email:** support@yourdomain.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://radix-ui.com/) - Component primitives
- [NewsAPI](https://newsapi.org/) - News data source
- [Guardian API](https://open-platform.theguardian.com/) - News data source

---

**Built with 💖 using Next.js and modern web technologies**