'use client';

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, setFilters, clearFilters} from '@/store/slices/newsSlice';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Badge} from '@/components/ui/badge';
import {Search, Filter, RefreshCw, ExternalLink, Calendar} from 'lucide-react';
import {formatDate} from '@/lib/utils';
import {toast} from 'react-hot-toast';

export default function ArticlesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {filteredArticles, filters, isLoading, error} = useSelector((state: RootState) => state.news);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [dateRange, setDateRange] = useState({start: '', end: ''});

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(setFilters({
            searchQuery: searchTerm,
            author: selectedAuthor,
            type: selectedType as 'all' | 'news' | 'blog',
            dateRange: dateRange
        }));
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedAuthor('');
        setSelectedType('all');
        setDateRange({start: '', end: ''});
        dispatch(clearFilters());
    };

    const handleRefresh = () => {
        dispatch(fetchNews());
        toast.success('Articles refreshed');
    };

    // Get unique authors for filter dropdown
    const uniqueAuthors = Array.from(new Set(filteredArticles.map(article => article.author)));

    if (error) {
        return (
            <DashboardLayout>
                <div className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400">Error loading articles: {error}</p>
                    <Button onClick={handleRefresh} className="mt-4">
                        <RefreshCw className="h-4 w-4 mr-2"/>
                        Retry
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Articles</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage and filter your news articles and blog posts
                        </p>
                    </div>
                    <Button onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}/>
                        Refresh
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Filter className="h-5 w-5 mr-2"/>
                            Filters
                        </CardTitle>
                        <CardDescription>
                            Filter articles by author, type, date range, or search terms
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {/* Search */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Search</label>
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            {/* Author Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Author</label>
                                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All authors"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All authors</SelectItem>
                                        {uniqueAuthors.map((author) => (
                                            <SelectItem key={author} value={author}>
                                                {author}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Type Filter */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All types</SelectItem>
                                        <SelectItem value="news">News</SelectItem>
                                        <SelectItem value="blog">Blog</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date Range */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Date Range</label>
                                <div className="flex space-x-2">
                                    <Input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                        className="flex-1"
                                    />
                                    <Input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button onClick={handleSearch}>
                                Apply Filters
                            </Button>
                            <Button variant="outline" onClick={handleClearFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredArticles.length} articles
                    </p>
                </div>

                {/* Articles Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400">No articles found matching your
                                criteria.</p>
                            <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                                Clear Filters
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map((article) => (
                            <Card key={article.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge variant={article.type === 'news' ? 'default' : 'secondary'}>
                                            {article.type}
                                        </Badge>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <ExternalLink className="h-4 w-4"/>
                                        </a>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg">
                                        {article.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {article.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>By {article.author}</span>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1"/>
                                            {formatDate(article.publishedAt)}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
