'use client';

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {initializeTheme} from '@/store/slices/uiSlice';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({children}: ThemeProviderProps) {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.ui.darkMode);

    useEffect(() => {
        dispatch(initializeTheme());
    }, [dispatch]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return <>{children}</>;
}