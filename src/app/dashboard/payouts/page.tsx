'use client';

import {useEffect, useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, updatePayoutData, loadPayoutData, initializePayoutData} from '@/store/slices/newsSlice';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {DollarSign, Save, Calculator, TrendingUp, AlertCircle} from 'lucide-react';
import {formatCurrency} from '@/lib/utils';
import {toast} from 'react-hot-toast';

export default function PayoutsPage() {
    const {user} = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const {articles, payoutData, isLoading} = useSelector((state: RootState) => state.news);
    const [editingRates, setEditingRates] = useState<{ [key: string]: number }>({});
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            dispatch(fetchNews());
            dispatch(loadPayoutData());
            dispatch(initializePayoutData());
            setDataLoaded(true);
        }
    }, [dispatch, dataLoaded]);

    // Check if user is admin
    const isAdmin = user?.role === 'admin';

    // Calculate author statistics
    const authorStats = articles.reduce((acc: any, article) => {
        const author = article.author;
        if (!acc[author]) {
            acc[author] = {
                totalArticles: 0,
                newsCount: 0,
                blogCount: 0,
            };
        }
        acc[author].totalArticles++;
        if (article.type === 'news') {
            acc[author].newsCount++;
        } else {
            acc[author].blogCount++;
        }
        return acc;
    }, {});

    const handleRateChange = (author: string, rate: number) => {
        setEditingRates(prev => ({
            ...prev,
            [author]: rate
        }));
    };

    const savePayoutData = () => {
        const newPayoutData = {...payoutData};

      Object.keys(authorStats).forEach(author => {
          const rate = editingRates[author] ?? payoutData[author]?.perArticle ?? 50;
          const count = authorStats[author].totalArticles;
          const total = rate * count;

        newPayoutData[author] = {
            perArticle: rate,
            total,
            count
        };
    });

      dispatch(updatePayoutData(newPayoutData));
      setEditingRates({});
      toast.success('Payout rates updated successfully!');
  };

    const totalPayout = Object.values(payoutData).reduce((sum, data) => sum + (data.total || 0), 0);
    const totalArticles = Object.values(authorStats).reduce((sum: number, stats: any) => sum + stats.totalArticles, 0);
    const hasUnsavedChanges = Object.keys(editingRates).length > 0;

    if (!isAdmin) {
    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4"/>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Admin Access Required
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        You need administrator privileges to access payout management.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
  }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payout Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage author payout rates and calculate total compensation
                    </p>
                </div>
                <Button
                    onClick={savePayoutData}
                    disabled={!hasUnsavedChanges || isLoading}
                    className={hasUnsavedChanges ? 'animate-pulse' : ''}
                >
                    <Save className="h-4 w-4 mr-2"/>
                    Save Changes
                    {hasUnsavedChanges && <span className="ml-2 text-xs">(Unsaved)</span>}
                </Button>
            </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(totalPayout)}</div>
                      <p className="text-xs text-muted-foreground">
                          For {totalArticles} articles
                      </p>
                  </CardContent>
              </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Authors</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{Object.keys(authorStats).length}</div>
                    <p className="text-xs text-muted-foreground">
                        Active contributors
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
                    <Calculator className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatCurrency(totalArticles > 0 ? totalPayout / totalArticles : 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Per article
                    </p>
                </CardContent>
            </Card>
        </div>

          {/* Payout Table */}
          <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                  <CardTitle>Author Payouts</CardTitle>
                  <CardDescription>
                      Set individual payout rates per article for each author
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  {isLoading && !dataLoaded ? (
                      <div className="space-y-4">
                          {[...Array(5)].map((_, i) => (
                              <div key={i} className="animate-pulse">
                                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                              </div>
                          ))}
                      </div>
                  ) : Object.keys(authorStats).length === 0 ? (
                      <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">
                              No articles available to calculate payouts.
                          </p>
                      </div>
                  ) : (
                      <div className="overflow-x-auto">
                          <table className="w-full">
                              <thead>
                              <tr className="border-b">
                                  <th className="text-left py-3 px-4 font-medium">Author</th>
                                  <th className="text-left py-3 px-4 font-medium">Articles</th>
                                  <th className="text-left py-3 px-4 font-medium">Types</th>
                                  <th className="text-left py-3 px-4 font-medium">Rate per Article</th>
                                  <th className="text-left py-3 px-4 font-medium">Total Payout</th>
                              </tr>
                              </thead>
                              <tbody>
                              {Object.entries(authorStats).map(([author, stats]: [string, any]) => {
                                  const currentRate = editingRates[author] ?? payoutData[author]?.perArticle ?? 50;
                                  const totalPayout = currentRate * stats.totalArticles;
                                  const hasChanges = editingRates[author] !== undefined;

                        return (
                            <tr
                                key={author}
                                className={`border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                                    hasChanges ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                }`}
                            >
                                <td className="py-4 px-4">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {author}
                            </div>
                          </td>
                            <td className="py-4 px-4">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {stats.totalArticles} total
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex space-x-2">
                                    {stats.newsCount > 0 && (
                                        <Badge variant="default">
                                            {stats.newsCount} news
                                        </Badge>
                                    )}
                                    {stats.blogCount > 0 && (
                                        <Badge variant="secondary">
                                            {stats.blogCount} blog
                                        </Badge>
                                    )}
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">$</span>
                                    <Input
                                        type="number"
                                        value={currentRate}
                                        onChange={(e) => handleRateChange(author, parseFloat(e.target.value) || 0)}
                                        className={`w-20 ${hasChanges ? 'border-blue-500 ring-blue-500' : ''}`}
                                        min="0"
                                        step="0.01"
                                    />
                                    {hasChanges && (
                                        <span className="text-xs text-blue-600 dark:text-blue-400">*</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className={`font-medium ${
                                    hasChanges
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-green-600 dark:text-green-400'
                                }`}>
                                    {formatCurrency(totalPayout)}
                                </div>
                            </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

          {/* Unsaved Changes Warning */}
          {hasUnsavedChanges && (
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                              <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                              <div>
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      You have unsaved changes
                    </span>
                                  <p className="text-xs text-blue-700 dark:text-blue-300">
                                      Don't forget to save your payout rate changes
                                  </p>
                              </div>
                          </div>
                          <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingRates({})}>
                                  Cancel
                              </Button>
                              <Button size="sm" onClick={savePayoutData}>
                                  Save Changes
                              </Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          )}
      </div>
    );
}
