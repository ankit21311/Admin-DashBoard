'use client';

import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {User} from 'firebase/auth';
import {onAuthStateChange} from '@/lib/firebase';

interface UserData {
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role: 'admin' | 'user';
    createdAt: any;
    lastLoginAt: any;
    updatedAt?: any;
    bio?: string;
    phone?: string;
    location?: string;
}

interface AuthUser extends User {
    role?: 'admin' | 'user';
    userData?: UserData;
    isDemo?: boolean;
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    refreshUserData: () => Promise<void>;
    signInDemo: (type: 'admin' | 'user') => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUserData: async () => {
    },
    signInDemo: () => {
    },
    signOut: () => {
    },
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const determineUserRole = (email: string): 'admin' | 'user' => {
        // Define admin emails - Add your Google account email here
        const adminEmails = [
            'admin@example.com',
            'admin@gmail.com',
            'your-admin-email@gmail.com', // Replace with your actual Gmail address
            // Add more admin email addresses as needed
        ];

        return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
    };

    const createUserWithRole = (firebaseUser: User): AuthUser => {
        const role = determineUserRole(firebaseUser.email || '');

        const userData: UserData = {
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || '',
            role,
            createdAt: new Date(),
            lastLoginAt: new Date(),
        };

        return {
            ...firebaseUser,
            role,
            userData
        } as AuthUser;
    };

    const createDemoUser = (type: 'admin' | 'user'): AuthUser => {
        const demoData = {
            admin: {
                uid: 'demo-admin-uid',
                email: 'admin@example.com',
                displayName: 'Demo Admin',
                photoURL: null,
            },
            user: {
                uid: 'demo-user-uid',
                email: 'user@example.com',
                displayName: 'Demo User',
                photoURL: null,
            }
        };

        const demo = demoData[type];

        const userData: UserData = {
            id: demo.uid,
            displayName: demo.displayName,
            email: demo.email,
            photoURL: demo.photoURL || undefined,  // or just set photoURL: undefined

            role: type,
            createdAt: new Date(),
            lastLoginAt: new Date(),
        };

        return {
            uid: demo.uid,
            email: demo.email,
            displayName: demo.displayName,
            photoURL: demo.photoURL,
            emailVerified: true,
            isAnonymous: false,
            metadata: {
                creationTime: new Date().toISOString(),
                lastSignInTime: new Date().toISOString(),
            },
            providerData: [],
            refreshToken: 'demo-refresh-token',
            tenantId: null,
            delete: async () => {
            },
            getIdToken: async () => 'demo-id-token',
            getIdTokenResult: async () => ({} as any),
            reload: async () => {
            },
            toJSON: () => ({}),
            role: type,
            userData,
            isDemo: true,
        } as AuthUser;
    };

    const signInDemo = (type: 'admin' | 'user') => {
        console.log(`Signing in as demo ${type}`);
        const demoUser = createDemoUser(type);
        setUser(demoUser);
        setLoading(false);

        // Store demo session in localStorage
        localStorage.setItem('demoUser', JSON.stringify({
            type,
            timestamp: new Date().toISOString()
        }));
    };

    const signOut = () => {
        console.log('Signing out');
        setUser(null);
        localStorage.removeItem('demoUser');
    };

    const refreshUserData = async () => {
        if (user && !user.isDemo) {
            const updatedUser = createUserWithRole(user);
            setUser(updatedUser);
        }
    };

    useEffect(() => {
        console.log('Setting up auth state listener...');

        // Check for demo user session first
        const demoSession = localStorage.getItem('demoUser');
        if (demoSession) {
            try {
                const {type, timestamp} = JSON.parse(demoSession);
                const sessionAge = new Date().getTime() - new Date(timestamp).getTime();
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours

                if (sessionAge < maxAge) {
                    console.log(`Restoring demo ${type} session`);
                    const demoUser = createDemoUser(type);
                    setUser(demoUser);
                    setLoading(false);
                    return;
                } else {
                    // Session expired
                    localStorage.removeItem('demoUser');
                }
            } catch (error) {
                console.error('Error parsing demo session:', error);
                localStorage.removeItem('demoUser');
            }
        }

        // Set up Firebase auth listener
        const unsubscribe = onAuthStateChange((firebaseUser) => {
            try {
                if (firebaseUser) {
                    console.log('User signed in:', firebaseUser.email);
                    const userWithRole = createUserWithRole(firebaseUser);
                    setUser(userWithRole);
                    console.log('User data loaded successfully for:', firebaseUser.email);
                    // Clear any demo session when real user signs in
                    localStorage.removeItem('demoUser');
                } else {
                    console.log('User signed out');
                    // Only set to null if no demo session exists
                    if (!localStorage.getItem('demoUser')) {
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Auth state change error:', error);
                if (!localStorage.getItem('demoUser')) {
                    setUser(null);
                }
            } finally {
                if (!localStorage.getItem('demoUser')) {
                    setLoading(false);
                }
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        refreshUserData,
        signInDemo,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
