'use client';

import {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {User} from 'firebase/auth';
import {onAuthStateChange, createUserDocument, getUserDocument} from '@/lib/firebase';

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

    const fetchUserData = async (firebaseUser: User) => {
        try {
            // Create user document if it doesn't exist
            await createUserDocument(firebaseUser);

            // Fetch user data from Firestore
            const userData = await getUserDocument(firebaseUser.uid);

            // Determine user role
            const role = determineUserRole(firebaseUser.email || '');

            setUser({
                ...firebaseUser,
                role,
                userData: userData as UserData
            } as AuthUser);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Fallback to basic user info
            const role = determineUserRole(firebaseUser.email || '');
            setUser({...firebaseUser, role} as AuthUser);
        }
    };

    const refreshUserData = async () => {
        if (user) {
            await fetchUserData(user);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            if (firebaseUser) {
                await fetchUserData(firebaseUser);
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
        refreshUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
