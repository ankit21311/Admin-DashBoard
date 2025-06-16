'use client';

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '@/store';
import {fetchNews, loadPayoutData} from '@/store/slices/newsSlice';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Download, FileText, Table, Calendar, Users} from 'lucide-react';
import {formatDate, formatCurrency} from '@/lib/utils';
import {toast} from 'react-hot-toast';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function ReportsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {articles, filteredArticles, payoutData, isLoading} = useSelector((state: RootState) => state.news);
    const [reportType, setReportType] = useState('all');
    const [exportFormat, setExportFormat] = useState('pdf');
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        dispatch(fetchNews());
        dispatch(loadPayoutData());
    }, [dispatch]);

    const generateReport = () => {
        let dataToExport = articles;

        if (reportType === 'filtered') {
            dataToExport = filteredArticles;
        }

        return dataToExport;
    };

    const exportToPDF = async () => {
        setIsExporting(true);
        try {
            const data = generateReport();
            const pdf = new jsPDF();

            // Add title
            pdf.setFontSize(20);
            pdf.text('Articles Report', 20, 20);

            // Add generation date
            pdf.setFontSize(12);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
            pdf.text(`Total Articles: ${data.length}`, 20, 40);

            let yPosition = 60;

            // Add articles
            data.forEach((article, index) => {
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 20;
                }

                pdf.setFontSize(12);
                pdf.text(`${index + 1}. ${article.title.substring(0, 50)}...`, 20, yPosition);
                pdf.setFontSize(10);
                pdf.text(`Author: ${article.author}`, 25, yPosition + 10);
                pdf.text(`Type: ${article.type}`, 25, yPosition + 20);
                pdf.text(`Date: ${formatDate(article.publishedAt)}`, 25, yPosition + 30);

                yPosition += 45;
            });

            pdf.save(`articles-report-${new Date().toISOString().split('T')[0]}.pdf`);
            toast.success('PDF report exported successfully!');
        } catch (error) {
            toast.error('Failed to export PDF report');
            console.error('PDF export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportToCSV = () => {
        setIsExporting(true);
        try {
            const data = generateReport();

            const csvData = data.map(article => ({
                Title: article.title,
                Author: article.author,
                Type: article.type,
                'Published Date': formatDate(article.publishedAt),
                Source: article.source.name,
                URL: article.url,
                Description: article.description,
            }));

            const worksheet = XLSX.utils.json_to_sheet(csvData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Articles');

            XLSX.writeFile(workbook, `articles-report-${new Date().toISOString().split('T')[0]}.xlsx`);
            toast.success('Excel report exported successfully!');
        } catch (error) {
            toast.error('Failed to export Excel report');
            console.error('Excel export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const exportPayouts = () => {
        setIsExporting(true);
        try {
            const payoutArray = Object.entries(payoutData).map(([author, data]) => ({
                Author: author,
                'Articles Count': data.count,
                'Rate per Article': formatCurrency(data.perArticle),
                'Total Payout': formatCurrency(data.total),
            }));

            const worksheet = XLSX.utils.json_to_sheet(payoutArray);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Payouts');

            XLSX.writeFile(workbook, `payouts-report-${new Date().toISOString().split('T')[0]}.xlsx`);
            toast.success('Payout report exported successfully!');
        } catch (error) {
            toast.error('Failed to export payout report');
            console.error('Payout export error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExport = () => {
        if (exportFormat === 'pdf') {
            exportToPDF();
        } else {
            exportToCSV();
        }
    };

    const totalPayout = Object.values(payoutData).reduce((sum, data) => sum + (data.total || 0), 0);
    const totalAuthors = Object.keys(payoutData).length;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Export</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Generate and export comprehensive reports for articles and payouts
                        </p>
                    </div>
                </div>

                {/* Export Options */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Articles Export */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="h-5 w-5 mr-2"/>
                                Articles Report
                            </CardTitle>
                            <CardDescription>
                                Export articles data in PDF or Excel format
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Report Type</label>
                                    <Select value={reportType} onValueChange={setReportType}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Articles</SelectItem>
                                            <SelectItem value="filtered">Filtered Articles</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Export Format</label>
                                    <Select value={exportFormat} onValueChange={setExportFormat}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF</SelectItem>
                                            <SelectItem value="excel">Excel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleExport}
                                    disabled={isExporting || isLoading}
                                    className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2"/>
                                    {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payouts Export */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Table className="h-5 w-5 mr-2"/>
                                Payouts Report
                            </CardTitle>
                            <CardDescription>
                                Export payout calculations and author compensation data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Total Authors:</span>
                                    <div className="font-semibold">{totalAuthors}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600 dark:text-gray-400">Total Payouts:</span>
                                    <div className="font-semibold text-green-600 dark:text-green-400">
                                        {formatCurrency(totalPayout)}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={exportPayouts}
                                    disabled={isExporting || isLoading}
                                    className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2"/>
                                    {isExporting ? 'Exporting...' : 'Export Payouts (Excel)'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{articles.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Available for export
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Filtered Articles</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredArticles.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently filtered
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Authors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalAuthors}</div>
                            <p className="text-xs text-muted-foreground">
                                With payout data
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Today</div>
                            <p className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Articles Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Articles Preview</CardTitle>
                        <CardDescription>
                            Preview of articles that will be included in the export
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(reportType === 'filtered' ? filteredArticles : articles)
                                .slice(0, 5)
                                .map((article) => (
                                    <div key={article.id}
                                         className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {article.title}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                By {article.author} • {formatDate(article.publishedAt)}
                                            </p>
                                        </div>
                                        <Badge variant={article.type === 'news' ? 'default' : 'secondary'}>
                                            {article.type}
                                        </Badge>
                                    </div>
                                ))}

                            {(reportType === 'filtered' ? filteredArticles : articles).length > 5 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    And {(reportType === 'filtered' ? filteredArticles : articles).length - 5} more
                                    articles...
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}