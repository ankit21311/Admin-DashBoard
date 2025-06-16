'use client';

import {useState, useEffect} from 'react';
import {signInWithGoogle, signInWithEmail, signUpWithEmail} from '@/lib/firebase';
import {useAuth} from '@/contexts/AuthContext';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {toast} from 'react-hot-toast';

export default function TestAuth() {
    const {user, loading} = useAuth();
    const [testResults, setTestResults] = useState<string[]>([]);

    const addResult = (message: string) => {
        setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    const testGoogleAuth = async () => {
        try {
            addResult('Testing Google authentication...');
            const result = await signInWithGoogle();
            addResult(`✅ Google auth successful: ${result.user.email}`);
            toast.success('Google auth successful!');
        } catch (error: any) {
            addResult(`❌ Google auth failed: ${error.message}`);
            toast.error('Google auth failed');
        }
    };

    const testEmailAuth = async () => {
        try {
            addResult('Testing email authentication...');
            const result = await signInWithEmail('admin@example.com', 'admin123');
            addResult(`✅ Email auth successful: ${result.user.email}`);
            toast.success('Email auth successful!');
        } catch (error: any) {
            addResult(`❌ Email auth failed: ${error.message}`);
            if (error.code === 'auth/user-not-found') {
                addResult('ℹ️ User not found - try creating the account first');
            }
            toast.error('Email auth failed');
        }
    };

    const createDemoAccount = async () => {
        try {
            addResult('Creating demo admin account...');
            const result = await signUpWithEmail('admin@example.com', 'admin123', 'Admin User');
            addResult(`✅ Demo account created: ${result.user.email}`);
            toast.success('Demo account created!');
        } catch (error: any) {
            addResult(`❌ Demo account creation failed: ${error.message}`);
            if (error.code === 'auth/email-already-in-use') {
                addResult('ℹ️ Account already exists - that\'s good!');
            }
            toast.error('Demo account creation failed');
        }
    };

    const clearResults = () => {
        setTestResults([]);
    };

    useEffect(() => {
        if (user) {
            addResult(`✅ User loaded: ${user.email} (${user.role})`);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>🧪 Authentication Test Page</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button onClick={testGoogleAuth} className="w-full">
                                Test Google Auth
                            </Button>
                            <Button onClick={testEmailAuth} variant="outline" className="w-full">
                                Test Email Auth
                            </Button>
                            <Button onClick={createDemoAccount} variant="secondary" className="w-full">
                                Create Demo Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>👤 Current User Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p>Loading...</p>
                        ) : user ? (
                            <div className="space-y-2">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>UID:</strong> {user.uid}</p>
                                <p><strong>Provider:</strong> {user.providerData?.map(p => p.providerId).join(', ')}</p>
                            </div>
                        ) : (
                            <p>No user signed in</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📋 Test Results</CardTitle>
                        <Button onClick={clearResults} size="sm" variant="outline">
                            Clear Results
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-h-64 overflow-y-auto">
                            {testResults.length === 0 ? (
                                <p className="text-gray-500">Run tests above to see results...</p>
                            ) : (
                                testResults.map((result, index) => (
                                    <div key={index} className="text-sm mb-1">
                                        {result}
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🔧 Firebase Configuration Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <p>✅ API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : '❌ Missing'}</p>
                            <p>✅ Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : '❌ Missing'}</p>
                            <p>✅ Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : '❌ Missing'}</p>
                            <p>✅ App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Set' : '❌ Missing'}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Button onClick={() => window.location.href = '/'} variant="outline">
                        ← Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}