'use client';

import {useState, useEffect} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Textarea} from '@/components/ui/textarea';
import {updateUserDocument} from '@/lib/firebase';
import {toast} from 'react-hot-toast';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Save,
    X,
    Shield,
    Clock
} from 'lucide-react';

export default function ProfilePage() {
    const {user, loading, refreshUserData} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        phone: '',
        location: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                bio: user.userData?.bio || '',
                phone: user.userData?.phone || '',
                location: user.userData?.location || '',
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            await updateUserDocument(user.uid, formData);
            await refreshUserData();
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                bio: user.userData?.bio || '',
                phone: user.userData?.phone || '',
                location: user.userData?.location || '',
            });
        }
        setIsEditing(false);
    };

    const formatDate = (date: any) => {
        if (!date) return 'Unknown';
        const dateObj = date.toDate ? date.toDate() : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!user) {
        return (
            <DashboardLayout>
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
                    </CardContent>
                </Card>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your account information and preferences
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                >
                                    <X className="h-4 w-4 mr-2"/>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    <Save className="h-4 w-4 mr-2"/>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>
                                <Edit3 className="h-4 w-4 mr-2"/>
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center pb-4">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'}/>
                                        <AvatarFallback className="text-2xl">
                                            {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl">
                                    {isEditing ? (
                                        <Input
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                                            placeholder="Display Name"
                                            className="text-center"
                                        />
                                    ) : (
                                        user.displayName || 'Anonymous User'
                                    )}
                                </CardTitle>
                                <CardDescription className="flex items-center justify-center">
                                    <Mail className="h-4 w-4 mr-2"/>
                                    {user.email}
                                </CardDescription>
                                <div className="flex justify-center mt-2">
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        <Shield className="h-3 w-3 mr-1"/>
                                        {user.role === 'admin' ? 'Administrator' : 'User'}
                                    </Badge>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Account Details */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Account Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-3 text-gray-400"/>
                                    <div>
                                        <p className="font-medium">Member since</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {formatDate(user.userData?.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-3 text-gray-400"/>
                                    <div>
                                        <p className="font-medium">Last login</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {formatDate(user.userData?.lastLoginAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm">
                                    <User className="h-4 w-4 mr-3 text-gray-400"/>
                                    <div>
                                        <p className="font-medium">User ID</p>
                                        <p className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                                            {user.uid}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Bio */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Bio</label>
                                    {isEditing ? (
                                        <Textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                            placeholder="Tell us about yourself..."
                                            rows={4}
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[100px]">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {user.userData?.bio || 'No bio provided'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Phone Number</label>
                                        {isEditing ? (
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        ) : (
                                            <div
                                                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400"/>
                                                <span className="text-gray-700 dark:text-gray-300">
                          {user.userData?.phone || 'Not provided'}
                        </span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Location</label>
                                        {isEditing ? (
                                            <Input
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                placeholder="City, Country"
                                            />
                                        ) : (
                                            <div
                                                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-400"/>
                                                <span className="text-gray-700 dark:text-gray-300">
                          {user.userData?.location || 'Not provided'}
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Authentication Provider Info */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Authentication Method</label>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                                        <div className="flex items-center space-x-2">
                                            {user.providerData?.map((provider, index) => (
                                                <Badge key={index} variant="outline">
                                                    {provider.providerId === 'google.com' ? 'Google' :
                                                        provider.providerId === 'password' ? 'Email/Password' :
                                                            provider.providerId}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}