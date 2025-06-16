'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {auth, db} from '@/lib/firebase';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';

interface StatusType {
    envVars: Record<string, boolean>;
    authStatus: string;
    firestoreStatus: string;
    authInstance: {
        currentUser: string;
        authDomain: string | undefined;
    } | null;
    firestoreInstance: {
        projectId: string;
    } | null;
}

export default function FirebaseCheck() {
    const [status, setStatus] = useState<StatusType>({
        envVars: {},
        authStatus: 'Checking...',
        firestoreStatus: 'Checking...',
        authInstance: null,
        firestoreInstance: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkFirebaseConfig();
    }, []);

    const checkFirebaseConfig = async () => {
        const checks: StatusType = {
            envVars: {},
            authStatus: 'Checking...',
            firestoreStatus: 'Checking...',
            authInstance: null,
            firestoreInstance: null,
        };

        // Check environment variables
        checks.envVars = {
            apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: !!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        };

        // Check Auth instance
        try {
            const authInstance = getAuth();
            checks.authStatus = '✅ Auth initialized successfully';
            checks.authInstance = {
                currentUser: authInstance.currentUser?.email || 'None',
                authDomain: authInstance.config.authDomain,
            };
        } catch (error) {
            checks.authStatus = `❌ Auth initialization failed: ${error}`;
        }

        // Check Firestore instance
        try {
            const firestoreInstance = getFirestore();
            checks.firestoreStatus = '✅ Firestore initialized successfully';
            checks.firestoreInstance = {
                projectId: (firestoreInstance as any)._delegate._databaseId.projectId,
            };
        } catch (error) {
            checks.firestoreStatus = `❌ Firestore initialization failed: ${error}`;
        }

        setStatus(checks);
        setLoading(false);
    };

    const testConnection = async () => {
        try {
            // Test auth connection
            console.log('Testing auth connection...');
            console.log('Auth instance:', auth);

            // Test firestore connection
            console.log('Testing firestore connection...');
            console.log('Firestore instance:', db);

            alert('Check browser console for detailed Firebase connection info');
        } catch (error) {
            console.error('Connection test failed:', error);
            alert('Connection test failed - check console for details');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>🔥 Firebase Configuration Check</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button onClick={checkFirebaseConfig}>Recheck Configuration</Button>
                            <Button onClick={testConnection} variant="outline">Test Connection</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Environment Variables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {Object.entries(status.envVars || {}).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="font-mono text-sm">{key}</span>
                                    <span className={value ? 'text-green-600' : 'text-red-600'}>
                    {value ? '✅ Set' : '❌ Missing'}
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Firebase Auth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{status.authStatus}</p>
                            {status.authInstance && (
                                <div className="space-y-2 text-sm">
                                    <p><strong>Current User:</strong> {status.authInstance.currentUser}</p>
                                    <p><strong>Auth Domain:</strong> {status.authInstance.authDomain}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Firestore Database</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{status.firestoreStatus}</p>
                            {status.firestoreInstance && (
                                <div className="space-y-2 text-sm">
                                    <p><strong>Project ID:</strong> {status.firestoreInstance.projectId}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Actual Environment Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded">
                            <p>API_KEY: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'Not set'}</p>
                            <p>AUTH_DOMAIN: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set'}</p>
                            <p>PROJECT_ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}</p>
                            <p>APP_ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'Not set'}</p>
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
