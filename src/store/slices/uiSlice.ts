import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UiState {
    darkMode: boolean;
    sidebarOpen: boolean;
    loading: {
        [key: string]: boolean;
    };
}

const initialState: UiState = {
    darkMode: false,
    sidebarOpen: true,
    loading: {},
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            if (typeof window !== 'undefined') {
                localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
            }
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('darkMode', JSON.stringify(action.payload));
            }
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
            state.loading[action.payload.key] = action.payload.loading;
        },
        initializeTheme: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('darkMode');
                if (saved) {
                    state.darkMode = JSON.parse(saved);
                } else {
                    // Check system preference
                    state.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
            }
        },
    },
});

export const {
    toggleDarkMode,
    setDarkMode,
    toggleSidebar,
    setSidebarOpen,
    setLoading,
    initializeTheme
} = uiSlice.actions;

export default uiSlice.reducer;