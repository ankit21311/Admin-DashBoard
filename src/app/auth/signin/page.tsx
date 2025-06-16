'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {toast} from 'react-hot-toast';
import {signInWithGoogle} from '@/lib/firebase';
import {useAuth} from '@/contexts/AuthContext';

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {user, loading} = useAuth();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            toast.success('Successfully signed in with Google!');
            router.push('/dashboard');
        } catch (error: any) {
            let errorMessage = 'Google sign in failed';

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Sign in was cancelled';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Popup was blocked by browser';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error occurred';
                    break;
                default:
                    errorMessage = error.message || 'Google sign in failed';
      }

        toast.error(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

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
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in to Admin Dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Use your Google account to access the dashboard
                    </p>
                </div>

          <Card>
              <CardHeader>
                  <CardTitle>Google Authentication</CardTitle>
                  <CardDescription>
                      Sign in with your Google account to access the admin dashboard
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  {/* Google Sign In Button */}
                  <Button
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                      className="w-full h-12 text-base"
                      variant="outline"
                  >
                      <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                          <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                      </svg>
                      {isLoading ? 'Signing in...' : 'Continue with Google'}
                  </Button>

              {/* Info Section */}
              <div className="text-center space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          Admin Access
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                          Admin privileges are granted based on your Google account email.
                          Contact your administrator if you need admin access.
                      </p>
              </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        Secure Authentication
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        Your authentication is handled securely by Google and Firebase.
                        We never store your password.
                    </p>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p>By signing in, you agree to our terms of service and privacy policy.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
