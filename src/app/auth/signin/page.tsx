'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {toast} from 'react-hot-toast';
import {signInWithGoogle, signInWithEmail, signUpWithEmail} from '@/lib/firebase';
import {useAuth} from '@/contexts/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();
    const {user, loading} = useAuth();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignUp) {
                await signUpWithEmail(email, password, name);
                toast.success('Account created successfully!');
            } else {
                await signInWithEmail(email, password);
                toast.success('Successfully signed in!');
            }
            router.push('/dashboard');
        } catch (error: any) {
            let errorMessage = 'Authentication failed';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already in use';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                default:
                    errorMessage = error.message || 'Authentication failed';
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleDemoSignIn = async (demoType: 'admin' | 'user') => {
        const demoCredentials = {
            admin: {email: 'admin@example.com', password: 'admin123'},
            user: {email: 'user@example.com', password: 'user123'}
        };

        setEmail(demoCredentials[demoType].email);
        setPassword(demoCredentials[demoType].password);

        setIsLoading(true);
        try {
            await signInWithEmail(demoCredentials[demoType].email, demoCredentials[demoType].password);
            toast.success(`Signed in as demo ${demoType}!`);
            router.push('/dashboard');
        } catch (error) {
            toast.error(`Demo ${demoType} account not found. Please create it first using the sign-up form.`);
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
                        {isSignUp ? 'Create your account' : 'Sign in to Admin Dashboard'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Access your news and blog management dashboard
                    </p>
                </div>

          <Card>
              <CardHeader>
                  <CardTitle>
                      {isSignUp ? 'Sign Up' : 'Sign In'}
                  </CardTitle>
                  <CardDescription>
                      Use Google or email authentication to access the dashboard
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

              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"/>
              </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
                </div>
            </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                  {isSignUp && (
                      <div>
                          <Input
                              type="text"
                              placeholder="Full Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                          />
                </div>
              )}
                <div>
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
            </form>

              {/* Toggle Sign Up/Sign In */}
              <div className="text-center">
                  <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm text-primary hover:underline"
                  >
                      {isSignUp
                          ? 'Already have an account? Sign in'
                          : "Don't have an account? Sign up"
                      }
                  </button>
              </div>

              {/* Demo Accounts */}
              <div className="space-y-2">
                  <p className="text-sm text-center text-muted-foreground">Quick Demo Access:</p>
                  <div className="flex space-x-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemoSignIn('admin')}
                          disabled={isLoading}
                          className="flex-1"
                      >
                          Demo Admin
                      </Button>
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemoSignIn('user')}
                          disabled={isLoading}
                          className="flex-1"
                      >
                          Demo User
                      </Button>
              </div>
                <div className="text-xs text-center text-muted-foreground">
                    <p>Admin: admin@example.com / admin123</p>
                    <p>User: user@example.com / user123</p>
                    <p className="mt-1 text-orange-600 dark:text-orange-400">
                        Create these accounts first if they don't exist
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
