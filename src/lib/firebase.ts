import {initializeApp, getApps, getApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import {getFirestore, doc, setDoc, getDoc, updateDoc, enableNetwork, disableNetwork} from 'firebase/firestore';
import {getAnalytics, isSupported} from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

// Google Auth Provider with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Auth functions
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign-in successful:', result.user.email);
        return result;
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
};

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log('Email sign-in successful:', result.user.email);
        return result;
    } catch (error) {
        console.error('Email sign-in error:', error);
        throw error;
    }
};

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile
        await updateProfile(user, {displayName});

        // Create user document in Firestore (with error handling)
        try {
            await createUserDocument(user, {displayName});
        } catch (firestoreError) {
            console.warn('Firestore operation failed, but user created:', firestoreError);
        }

        console.log('Email sign-up successful:', user.email);
        return userCredential;
    } catch (error) {
        console.error('Email sign-up error:', error);
        throw error;
    }
};

export const logout = () => signOut(auth);

export const onAuthStateChange = (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback);

// Firestore functions for user data with error handling
export const createUserDocument = async (user: User, additionalData = {}) => {
    if (!user) return;

    try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const {displayName, email, photoURL} = user;
            const createdAt = new Date();

            await setDoc(userRef, {
                displayName,
                email,
                photoURL,
                createdAt,
                lastLoginAt: createdAt,
                role: determineUserRole(email || ''),
                ...additionalData
            });
            console.log('User document created successfully');
        } else {
            // Update last login time
            await updateDoc(userRef, {
                lastLoginAt: new Date()
            });
            console.log('User document updated successfully');
        }

        return userRef;
    } catch (error) {
        console.error('Firestore operation failed:', error);
        // Don't throw error - allow authentication to continue without Firestore
        return null;
    }
};

export const getUserDocument = async (uid: string) => {
    if (!uid) return null;

    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            console.log('User document fetched successfully');
            return {id: userSnap.id, ...userSnap.data()};
        }
    } catch (error) {
        console.error('Error getting user document:', error);
        // Return null instead of throwing - allow app to continue
    }

    return null;
};

export const updateUserDocument = async (uid: string, data: any) => {
    if (!uid) return;

    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            ...data,
            updatedAt: new Date()
        });
        console.log('User document updated successfully');
    } catch (error) {
        console.error('Error updating user document:', error);
        throw error; // Throw for profile updates since user expects feedback
    }
};

// Determine user role based on email
const determineUserRole = (email: string): 'admin' | 'user' => {
    const adminEmails = [
        'admin@example.com',
        'admin@gmail.com',
        // Add your admin emails here
    ];

    return adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
};

export {auth, db, analytics};
export default app;
