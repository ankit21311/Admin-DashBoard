'use client';

import {useState} from 'react';
import {useSession, signOut} from 'next-auth/react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@/store';
import {toggleSidebar, toggleDarkMode} from '@/store/slices/uiSlice';
import {Button} from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Menu,
    Sun,
    Moon,
    BarChart3,
    DollarSign,
    Download
} from 'lucide-react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const navigation = [
    {name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard},
    {name: 'Articles', href: '/dashboard/articles', icon: FileText},
    {name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3},
    {name: 'Payouts', href: '/dashboard/payouts', icon: DollarSign},
    {name: 'Reports', href: '/dashboard/reports', icon: Download},
    {name: 'Settings', href: '/dashboard/settings', icon: Settings},
];

export default function DashboardLayout({children}: DashboardLayoutProps) {
    const {data: session} = useSession();
    const dispatch = useDispatch();
    const {sidebarOpen, darkMode} = useSelector((state: RootState) => state.ui);
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({callbackUrl: '/auth/signin'});
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
                "md:translate-x-0 md:static md:inset-0"
            )}>
                <div className="flex items-center justify-center h-16 px-4 bg-primary">
                    <h1 className="text-xl font-bold text-primary-foreground">
                        Admin Dashboard
                    </h1>
                </div>

                <nav className="mt-5 px-2">
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5"/>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User info */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </span>
                            </div>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {session?.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {(session?.user as any)?.role === 'admin' ? 'Administrator' : 'User'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
                {/* Top navigation */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => dispatch(toggleSidebar())}
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5"/>
                                </Button>
                                <h2 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                                </h2>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Dark mode toggle */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => dispatch(toggleDarkMode())}
                                >
                                    {darkMode ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
                                </Button>

                                {/* Sign out button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="h-5 w-5"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => dispatch(toggleSidebar())}
                />
            )}
        </div>
    );
}