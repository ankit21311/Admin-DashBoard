'use client';

import {Provider} from 'react-redux';
import {store} from '@/store';
import {Toaster} from 'react-hot-toast';
import {ThemeProvider} from '@/components/theme-provider';
import {AuthProvider} from '@/contexts/AuthContext';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({children}: ProvidersProps) {
    return (
        <AuthProvider>
            <Provider store={store}>
                <ThemeProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: 'hsl(var(--card))',
                                color: 'hsl(var(--card-foreground))',
                                border: '1px solid hsl(var(--border))',
                            },
                        }}
                    />
                </ThemeProvider>
            </Provider>
        </AuthProvider>
    );
}
