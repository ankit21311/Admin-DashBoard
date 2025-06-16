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
            console.log('User is authenticated, redirecting to dashboard...');
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
                </div>
            </div>
        );
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
                        and export features. Built with Next.js and Google Authentication via Firebase.
                    </p>
                    <div className="space-x-4">
                        <Link href="/auth/signin">
                            <Button size="lg">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/test-auth">
                            <Button variant="outline" size="lg">
                                Test Authentication
                            </Button>
                        </Link>
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
                                Secure authentication with Google OAuth and Email/Password using Firebase Auth.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Demo Information */}
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Authentication Options</CardTitle>
                        <CardDescription>
                            Multiple ways to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">🔐 Google Authentication</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Sign in with your Google account for seamless access. Admin privileges are granted based
                                on your email address.
                            </p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h4 className="font-semibold text-green-900 dark:text-green-100">📧 Email/Password</h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                Create an account or sign in with email and password. Demo accounts available for
                                testing.
                            </p>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100">🧪 Demo Accounts</h4>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                                <strong>Admin:</strong> admin@example.com / admin123<br/>
                                <strong>User:</strong> user@example.com / user123<br/>
                                <em>Create these accounts first if they don't exist</em>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="text-center mt-12">
                    <div className="space-x-4">
                        <Link href="/auth/signin">
                            <Button size="lg" className="mb-4">
                                Sign In / Sign Up
                            </Button>
                        </Link>
                        <Link href="/test-auth">
                            <Button variant="outline" size="lg" className="mb-4">
                                Test Authentication
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        New to the platform? Click "Sign In / Sign Up" and toggle to create an account.
                    </p>
                </div>
            </div>
        </div>
    );
}
