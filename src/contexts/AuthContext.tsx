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
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUserData: async () => {
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

    const refreshUserData = async () => {
        if (user) {
            const updatedUser = createUserWithRole(user);
            setUser(updatedUser);
        }
    };

    useEffect(() => {
        console.log('Setting up auth state listener...');
        const unsubscribe = onAuthStateChange((firebaseUser) => {
            try {
                if (firebaseUser) {
                    console.log('User signed in:', firebaseUser.email);
                    const userWithRole = createUserWithRole(firebaseUser);
                    setUser(userWithRole);
                    console.log('User data loaded successfully for:', firebaseUser.email);
                } else {
                    console.log('User signed out');
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth state change error:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        loading,
        refreshUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
