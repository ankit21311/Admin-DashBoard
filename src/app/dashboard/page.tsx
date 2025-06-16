'use client';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, loadPayoutData, initializePayoutData} from '@/store/slices/newsSlice';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {FileText, TrendingUp, DollarSign, Users} from 'lucide-react';
import {formatCurrency} from '@/lib/utils';
import dynamic from 'next/dynamic';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

// Lazy load charts to improve performance
const LazyDoughnut = dynamic(() => import('react-chartjs-2').then(mod => ({default: mod.Doughnut})), {
    ssr: false,
    loading: () => <div
        className="h-[300px] flex items-center justify-center animate-pulse bg-gray-100 dark:bg-gray-800 rounded">Loading
        chart...</div>
});

const LazyBar = dynamic(() => import('react-chartjs-2').then(mod => ({default: mod.Bar})), {
    ssr: false,
    loading: () => <div
        className="h-[300px] flex items-center justify-center animate-pulse bg-gray-100 dark:bg-gray-800 rounded">Loading
        chart...</div>
});

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const {articles, isLoading, totalCount, payoutData} = useSelector((state: RootState) => state.news);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            const loadData = async () => {
                dispatch(loadPayoutData());
                await dispatch(fetchNews());
                dispatch(initializePayoutData());
            };
            loadData();
            setDataLoaded(true);
        }
    }, [dispatch, dataLoaded]);

    // Show loading state while data is being fetched
    if (isLoading && !dataLoaded) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Calculate statistics
    const newsCount = articles.filter(article => article.type === 'news').length;
    const blogCount = articles.filter(article => article.type === 'blog').length;
    const totalPayout = Object.values(payoutData).reduce((sum, data) => sum + (data.total || 0), 0);
    const uniqueAuthors = Array.from(new Set(articles.map(article => article.author))).length;

    // Chart data
    const typeChartData = {
        labels: ['News Articles', 'Blog Posts'],
        datasets: [
            {
                data: [newsCount, blogCount],
                backgroundColor: ['#3b82f6', '#10b981'],
                borderColor: ['#2563eb', '#059669'],
                borderWidth: 2,
                hoverOffset: 4,
            },
        ],
    };

    const topAuthors = Object.entries(payoutData)
        .sort(([, a], [, b]) => (b.count || 0) - (a.count || 0))
        .slice(0, 5);

    const authorChartData = {
        labels: topAuthors.map(([author]) => author),
        datasets: [
            {
                label: 'Articles Count',
                data: topAuthors.map(([, data]) => data.count || 0),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: '#3b82f6',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {newsCount} news, {blogCount} blog posts
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Authors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{uniqueAuthors}</div>
                        <p className="text-xs text-muted-foreground">
                            Active contributors
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalPayout)}</div>
                        <p className="text-xs text-muted-foreground">
                            Calculated payouts
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Growth</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12%</div>
                        <p className="text-xs text-muted-foreground">
                            From last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Content Distribution</CardTitle>
                        <CardDescription>
                            Distribution of news articles vs blog posts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <LazyDoughnut data={typeChartData} options={doughnutOptions}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Top Authors</CardTitle>
                        <CardDescription>
                            Top 5 authors by article count
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <LazyBar data={authorChartData} options={chartOptions}/>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Articles */}
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle>Recent Articles</CardTitle>
                    <CardDescription>
                        Latest articles and blog posts
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {articles.slice(0, 5).map((article) => (
                            <div
                                key={article.id}
                                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {article.title}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        By {article.author} • {new Date(article.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.type === 'news'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {article.type}
                  </span>
                </div>
                            </div>
                        ))}
                    </div>
                    {articles.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No articles available. Check your news API
                                configuration.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
