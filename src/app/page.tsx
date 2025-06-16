'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {BarChart3, FileText, Shield, TrendingUp} from 'lucide-react';
import Link from 'next/link';
import {useAuth} from '@/contexts/AuthContext';

export default function Home() {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
    }
  }, [user, loading, router]);

    if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
    );
  }

    if (user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Admin Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        A comprehensive news and blog management system with analytics, payout calculation,
                        and export features. Built with Next.js and Firebase Authentication.
                    </p>
                    <div className="space-x-4">
                        <Link href="/auth/signin">
                            <Button size="lg">
                                Get Started
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card>
                  <CardHeader>
                      <FileText className="h-10 w-10 text-primary mb-2"/>
                      <CardTitle>Content Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <CardDescription>
                          Manage news articles and blog posts with advanced filtering and search capabilities.
                      </CardDescription>
                  </CardContent>
              </Card>

            <Card>
                <CardHeader>
                    <BarChart3 className="h-10 w-10 text-primary mb-2"/>
                    <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Visualize your content performance with interactive charts and real-time statistics.
                    </CardDescription>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <TrendingUp className="h-10 w-10 text-primary mb-2"/>
                    <CardTitle>Payout Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Calculate and manage author payouts with customizable rates and automated calculations.
                    </CardDescription>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-2"/>
                    <CardTitle>Firebase Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Secure authentication with Google OAuth and email/password using Firebase Auth.
                    </CardDescription>
                </CardContent>
            </Card>
        </div>

          {/* Demo Credentials */}
          <Card className="max-w-md mx-auto">
              <CardHeader>
                  <CardTitle>Demo Credentials</CardTitle>
                  <CardDescription>
                      Create these accounts in Firebase or use the demo accounts
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Admin Account</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                          Email: admin@example.com<br/>
                          Password: admin123
                      </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-900 dark:text-green-100">User Account</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                          Email: user@example.com<br/>
                          Password: user123
                      </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">Firebase Setup</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                          Configure Firebase project with your credentials in .env.local
                      </p>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
