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
            console.log('Fetching user data for:', firebaseUser.email);

            // Determine user role
            const role = determineUserRole(firebaseUser.email || '');

            // Try to create/update user document in Firestore
            try {
                await createUserDocument(firebaseUser);
            } catch (error) {
                console.warn('Firestore operation failed, continuing without user document:', error);
            }

            // Try to fetch user data from Firestore
            let userData: UserData | null = null;
            try {
                const fetchedData = await getUserDocument(firebaseUser.uid);
                if (fetchedData && typeof fetchedData === 'object') {
                    userData = fetchedData as UserData;
        }
      } catch (error) {
          console.warn('Failed to fetch user document, using basic user info:', error);
      }

        // Set user with available data
        const userWithRole = {
            ...firebaseUser,
            role,
            userData: userData || {
                id: firebaseUser.uid,
                displayName: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || '',
                role,
                createdAt: new Date(),
                lastLoginAt: new Date(),
            } as UserData
      } as AuthUser;

        setUser(userWithRole);
        console.log('User data loaded successfully for:', firebaseUser.email);
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to basic user info
        const role = determineUserRole(firebaseUser.email || '');
        setUser({
            ...firebaseUser,
            role,
            userData: {
                id: firebaseUser.uid,
                displayName: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                photoURL: firebaseUser.photoURL || '',
                role,
                createdAt: new Date(),
                lastLoginAt: new Date(),
            } as UserData
      } as AuthUser);
    }
  };

    const refreshUserData = async () => {
        if (user) {
            await fetchUserData(user);
        }
    };

    useEffect(() => {
        console.log('Setting up auth state listener...');
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    console.log('User signed in:', firebaseUser.email);
                    await fetchUserData(firebaseUser);
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
