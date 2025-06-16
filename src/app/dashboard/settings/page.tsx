'use client';

import {useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {toggleDarkMode} from '@/store/slices/uiSlice';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Badge} from '@/components/ui/badge';
import {Settings, Moon, Sun, User, Shield, Mail, Database, Palette} from 'lucide-react';
import {toast} from 'react-hot-toast';

export default function SettingsPage() {
    const {user} = useAuth();
    const dispatch = useDispatch();
    const {darkMode} = useSelector((state: RootState) => state.ui);
    const [apiKey, setApiKey] = useState('');

    const handleThemeToggle = () => {
        dispatch(toggleDarkMode());
        toast.success(darkMode ? 'Light mode enabled' : 'Dark mode enabled');
    };

    const handleSaveApiKey = () => {
        if (apiKey.trim()) {
            // In a real app, this would save to environment or database
            toast.success('API key saved successfully');
            setApiKey('');
        } else {
            toast.error('Please enter a valid API key');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Configure your dashboard preferences and account settings
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Information */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="h-5 w-5 mr-2"/>
                            Account Information
                        </CardTitle>
                        <CardDescription>
                            Your account details and role information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <Input value={user?.email || ''} disabled className="mt-1"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                            <Input value={user?.displayName || user?.email?.split('@')[0] || ''} disabled
                                   className="mt-1"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                            <div className="mt-1">
                                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}
                                       className="capitalize">
                                    <Shield className="h-3 w-3 mr-1"/>
                                    {user?.role || 'user'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Palette className="h-5 w-5 mr-2"/>
                            Appearance
                        </CardTitle>
                        <CardDescription>
                            Customize the look and feel of your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm font-medium">Dark Mode</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Toggle between light and dark themes
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Sun className="h-4 w-4"/>
                                <Switch checked={darkMode} onCheckedChange={handleThemeToggle}/>
                                <Moon className="h-4 w-4"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* API Configuration */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Database className="h-5 w-5 mr-2"/>
                            API Configuration
                        </CardTitle>
                        <CardDescription>
                            Configure external API settings for news data
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">News API Key</label>
                            <div className="mt-1 flex space-x-2">
                                <Input
                                    type="password"
                                    placeholder="Enter your News API key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                                <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                                    Save
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Get your API key from{' '}
                                <a
                                    href="https://newsapi.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
                                >
                                    newsapi.org
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Admin Settings */}
                {user?.role === 'admin' && (
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Shield className="h-5 w-5 mr-2"/>
                                Admin Settings
                            </CardTitle>
                            <CardDescription>
                                Administrator-only configuration options
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Admin Privileges</h4>
                                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                    <li>• Access to payout management</li>
                                    <li>• Generate and export reports</li>
                                    <li>• Configure system settings</li>
                                    <li>• Manage user roles</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                                    <Mail className="h-4 w-4 inline mr-1"/>
                                    Admin Email Configuration
                                </h4>
                                <p className="text-sm text-amber-700 dark:text-amber-300">
                                    To grant admin access to additional users, update the admin email list in:
                                </p>
                                <code className="text-xs bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded mt-2 block">
                                    src/contexts/AuthContext.tsx
                                </code>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* System Information */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Settings className="h-5 w-5 mr-2"/>
                        System Information
                    </CardTitle>
                    <CardDescription>
                        Application details and version information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Version:</span>
                            <div className="text-gray-600 dark:text-gray-400">1.0.0</div>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Framework:</span>
                            <div className="text-gray-600 dark:text-gray-400">Next.js 14.0.4</div>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Authentication:</span>
                            <div className="text-gray-600 dark:text-gray-400">Firebase Auth</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}