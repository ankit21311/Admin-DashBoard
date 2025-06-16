'use client';

import {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, loadPayoutData} from '@/store/slices/newsSlice';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Doughnut, Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import {FileText, TrendingUp, DollarSign, Users} from 'lucide-react';
import {formatCurrency} from '@/lib/utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Dashboard() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {articles, isLoading, totalCount, payoutData} = useSelector((state: RootState) => state.news);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
            return;
        }

        if (status === 'authenticated') {
            dispatch(fetchNews());
            dispatch(loadPayoutData());
        }
    }, [dispatch, status, router]);

    if (status === 'loading' || isLoading) {
        return (
            <DashboardLayout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </DashboardLayout>
        );
    }

    // Calculate statistics
    const newsCount = articles.filter(article => article.type === 'news').length;
    const blogCount = articles.filter(article => article.type === 'blog').length;
    const totalPayout = Object.values(payoutData).reduce((sum, data) => sum + data.total, 0);
    const uniqueAuthors = new Set(articles.map(article => article.author)).size;

    // Chart data
    const typeChartData = {
        labels: ['News', 'Blog'],
        datasets: [
            {
                data: [newsCount, blogCount],
                backgroundColor: ['#3b82f6', '#10b981'],
                borderColor: ['#2563eb', '#059669'],
                borderWidth: 1,
            },
        ],
    };

    const authorChartData = {
        labels: Object.keys(payoutData).slice(0, 5),
        datasets: [
            {
                label: 'Articles Count',
                data: Object.values(payoutData).slice(0, 5).map(data => data.count),
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
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

                    <Card>
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

                    <Card>
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

                    <Card>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Distribution</CardTitle>
                            <CardDescription>
                                Distribution of news articles vs blog posts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <Doughnut data={typeChartData} options={chartOptions}/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Authors</CardTitle>
                            <CardDescription>
                                Top 5 authors by article count
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <Bar data={authorChartData} options={chartOptions}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Articles */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Articles</CardTitle>
                        <CardDescription>
                            Latest articles and blog posts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {articles.slice(0, 5).map((article) => (
                                <div key={article.id}
                                     className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
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
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
