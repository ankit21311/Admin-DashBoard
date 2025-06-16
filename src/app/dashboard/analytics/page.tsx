'use client';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, loadPayoutData, initializePayoutData} from '@/store/slices/newsSlice';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {TrendingUp, Users, FileText, Calendar, BarChart3, PieChart} from 'lucide-react';
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
    ArcElement,
    LineElement,
    PointElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

// Lazy load charts
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

const LazyLine = dynamic(() => import('react-chartjs-2').then(mod => ({default: mod.Line})), {
    ssr: false,
    loading: () => <div
        className="h-[300px] flex items-center justify-center animate-pulse bg-gray-100 dark:bg-gray-800 rounded">Loading
        chart...</div>
});

export default function AnalyticsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {articles, payoutData, isLoading} = useSelector((state: RootState) => state.news);
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

    if (isLoading && !dataLoaded) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            </div>
        );
    }

    // Analytics calculations
    const newsCount = articles.filter(article => article.type === 'news').length;
    const blogCount = articles.filter(article => article.type === 'blog').length;
    const totalPayout = Object.values(payoutData).reduce((sum, data) => sum + (data.total || 0), 0);
    const uniqueAuthors = Array.from(new Set(articles.map(article => article.author))).length;
    const avgPayoutPerAuthor = uniqueAuthors > 0 ? totalPayout / uniqueAuthors : 0;

    // Monthly data simulation (in real app, this would come from database)
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Articles Published',
                data: [12, 19, 8, 15, 22, 18],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Blog Posts',
                data: [8, 11, 6, 9, 14, 12],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
            },
        ],
    };

    // Content type distribution
    const typeDistribution = {
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

    // Top authors by article count
    const topAuthors = Object.entries(payoutData)
        .sort(([, a], [, b]) => (b.count || 0) - (a.count || 0))
        .slice(0, 10);

    const authorChartData = {
        labels: topAuthors.map(([author]) => author.length > 15 ? author.substring(0, 15) + '...' : author),
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

    // Author payout distribution
    const payoutChartData = {
        labels: topAuthors.slice(0, 5).map(([author]) => author.length > 10 ? author.substring(0, 10) + '...' : author),
        datasets: [
            {
                data: topAuthors.slice(0, 5).map(([, data]) => data.total || 0),
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                ],
                borderWidth: 2,
                hoverOffset: 4,
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
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive analytics and insights for your content and payouts
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{articles.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {newsCount} news, {blogCount} blogs
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{uniqueAuthors}</div>
                        <p className="text-xs text-muted-foreground">
                            Contributing writers
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalPayout)}</div>
                        <p className="text-xs text-muted-foreground">
                            Calculated earnings
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg per Author</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(avgPayoutPerAuthor)}</div>
                        <p className="text-xs text-muted-foreground">
                            Average earnings
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2"/>
                            Content Growth Trend
                        </CardTitle>
                        <CardDescription>
                            Monthly article and blog post publication trends
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <LazyLine data={monthlyData} options={chartOptions}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PieChart className="h-5 w-5 mr-2"/>
                            Content Distribution
                        </CardTitle>
                        <CardDescription>
                            Distribution between news articles and blog posts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <LazyDoughnut data={typeDistribution} options={doughnutOptions}/>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Top Authors by Article Count</CardTitle>
                        <CardDescription>
                            Most productive authors in your platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <LazyBar data={authorChartData} options={chartOptions}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Top Earners</CardTitle>
                        <CardDescription>
                            Author payout distribution (top 5)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <LazyDoughnut data={payoutChartData} options={doughnutOptions}/>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Author Performance</CardTitle>
                        <CardDescription>
                            Detailed breakdown of author contributions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topAuthors.slice(0, 8).map(([author, data], index) => (
                                <div key={author}
                                     className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{author}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {data.count} articles
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            {formatCurrency(data.total || 0)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatCurrency(data.perArticle || 0)}/article
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Content Types Analysis</CardTitle>
                        <CardDescription>
                            Breakdown of content types and performance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">News
                                            Articles</h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            Breaking news and current events
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{newsCount}</p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">
                                            {articles.length > 0 ? Math.round((newsCount / articles.length) * 100) : 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-green-900 dark:text-green-100">Blog Posts</h4>
                                        <p className="text-sm text-green-700 dark:text-green-300">
                                            In-depth articles and opinions
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">{blogCount}</p>
                                        <p className="text-sm text-green-700 dark:text-green-300">
                                            {articles.length > 0 ? Math.round((blogCount / articles.length) * 100) : 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Stats</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Avg articles/author:</span>
                                        <div
                                            className="font-medium">{uniqueAuthors > 0 ? Math.round(articles.length / uniqueAuthors) : 0}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Content growth:</span>
                                        <div className="font-medium text-green-600 dark:text-green-400">+12%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}