import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    publishedAt: string;
    url: string;
    urlToImage?: string;
    type: 'news' | 'blog';
    source: {
        name: string;
    };
}

interface FilterState {
    author: string;
    dateRange: {
        start: string;
        end: string;
    };
    type: 'all' | 'news' | 'blog';
    searchQuery: string;
}

interface PayoutData {
    [authorName: string]: {
        perArticle: number;
        total: number;
        count: number;
    };
}

interface NewsState {
    articles: Article[];
    filteredArticles: Article[];
    filters: FilterState;
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    payoutData: PayoutData;
}

const initialState: NewsState = {
    articles: [],
    filteredArticles: [],
    filters: {
        author: '',
        dateRange: {
            start: '',
            end: '',
        },
        type: 'all',
        searchQuery: '',
    },
    isLoading: false,
    error: null,
    totalCount: 0,
    payoutData: {},
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('/api/news');
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            return data.articles || [];
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
            state.filters = {...state.filters, ...action.payload};

            // Apply filters
            let filtered = state.articles;

            if (state.filters.author) {
                filtered = filtered.filter(article =>
                    article.author.toLowerCase().includes(state.filters.author.toLowerCase())
                );
            }

            if (state.filters.type !== 'all') {
                filtered = filtered.filter(article => article.type === state.filters.type);
            }

            if (state.filters.searchQuery) {
                const query = state.filters.searchQuery.toLowerCase();
                filtered = filtered.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    article.description?.toLowerCase().includes(query) ||
                    article.author.toLowerCase().includes(query)
                );
            }

            if (state.filters.dateRange.start && state.filters.dateRange.end) {
                filtered = filtered.filter(article => {
                    const articleDate = new Date(article.publishedAt);
                    const startDate = new Date(state.filters.dateRange.start);
                    const endDate = new Date(state.filters.dateRange.end);
                    return articleDate >= startDate && articleDate <= endDate;
                });
            }

            state.filteredArticles = filtered;
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
            state.filteredArticles = state.articles;
        },
        updatePayoutData: (state, action: PayloadAction<PayoutData>) => {
            state.payoutData = action.payload;
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('payoutData', JSON.stringify(action.payload));
            }
        },
        loadPayoutData: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('payoutData');
                if (saved) {
                    state.payoutData = JSON.parse(saved);
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
                state.filteredArticles = action.payload;
                state.totalCount = action.payload.length;
                state.error = null;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {setFilters, clearFilters, updatePayoutData, loadPayoutData} = newsSlice.actions;
export default newsSlice.reducer;