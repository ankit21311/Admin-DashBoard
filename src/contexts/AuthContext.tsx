'use client';

import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {User} from 'firebase/auth';
import {onAuthStateChange} from '@/lib/firebase';

interface AuthUser extends User {
    role?: 'admin' | 'user';
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
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

    useEffect(() => {
        const unsubscribe = onAuthStateChange((firebaseUser) => {
            if (firebaseUser) {
                // Determine user role based on email or other criteria
                const role = determineUserRole(firebaseUser.email || '');
                setUser({...firebaseUser, role} as AuthUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

      return unsubscribe;
  }, []);

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

    const value = {
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
