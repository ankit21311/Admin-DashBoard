import {NextRequest, NextResponse} from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;

// Mock data for demo purposes when API keys are not available
const mockArticles = [
    {
        id: '1',
        title: 'Tech Giants Report Strong Q4 Earnings',
        description: 'Major technology companies show impressive growth in their latest quarterly reports.',
        content: 'Technology companies across the board have reported strong earnings for the fourth quarter...',
        author: 'John Smith',
        publishedAt: '2024-01-15T10:30:00Z',
        url: 'https://example.com/tech-earnings',
        urlToImage: 'https://via.placeholder.com/400x200',
        type: 'news' as const,
        source: {name: 'Tech Daily'}
    },
    {
        id: '2',
        title: 'The Future of AI in Healthcare',
        description: 'Exploring how artificial intelligence is revolutionizing patient care and medical research.',
        content: 'Artificial intelligence is transforming healthcare in unprecedented ways...',
        author: 'Sarah Johnson',
        publishedAt: '2024-01-14T15:45:00Z',
        url: 'https://example.com/ai-healthcare',
        urlToImage: 'https://via.placeholder.com/400x200',
        type: 'blog' as const,
        source: {name: 'Health Tech Blog'}
    },
    {
        id: '3',
        title: 'Climate Change Summit Concludes with New Agreements',
        description: 'World leaders reach consensus on new climate action policies.',
        content: 'The international climate summit has concluded with significant new agreements...',
        author: 'Michael Chen',
        publishedAt: '2024-01-13T09:15:00Z',
        url: 'https://example.com/climate-summit',
        urlToImage: 'https://via.placeholder.com/400x200',
        type: 'news' as const,
        source: {name: 'Global News'}
    },
    {
        id: '4',
        title: 'Building Scalable Web Applications',
        description: 'Best practices for creating web applications that can handle millions of users.',
        content: 'When building web applications for scale, there are several key considerations...',
        author: 'Emily Davis',
        publishedAt: '2024-01-12T14:20:00Z',
        url: 'https://example.com/scalable-web-apps',
        urlToImage: 'https://via.placeholder.com/400x200',
        type: 'blog' as const,
        source: {name: 'Dev Blog'}
    },
    {
        id: '5',
        title: 'Stock Market Hits Record High',
        description: 'Markets continue their upward trend amid positive economic indicators.',
        content: 'The stock market reached new record highs today as investors remain optimistic...',
        author: 'Robert Wilson',
        publishedAt: '2024-01-11T11:30:00Z',
        url: 'https://example.com/stock-market-high',
        urlToImage: 'https://via.placeholder.com/400x200',
        type: 'news' as const,
        source: {name: 'Financial Times'}
    }
];

async function fetchFromNewsAPI() {
    if (!NEWS_API_KEY) return null;

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${NEWS_API_KEY}`
        );

        if (!response.ok) throw new Error('NewsAPI request failed');

        const data = await response.json();
        return data.articles?.map((article: any, index: number) => ({
            id: `news-${index}`,
            title: article.title,
            description: article.description,
            content: article.content || article.description,
            author: article.author || 'Unknown Author',
            publishedAt: article.publishedAt,
            url: article.url,
            urlToImage: article.urlToImage,
            type: 'news',
            source: article.source
        }));
    } catch (error) {
        console.error('NewsAPI Error:', error);
        return null;
    }
}

async function fetchFromGuardianAPI() {
    if (!GUARDIAN_API_KEY) return null;

    try {
        const response = await fetch(
            `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=body,byline,thumbnail&page-size=50`
        );

        if (!response.ok) throw new Error('Guardian API request failed');

        const data = await response.json();
        return data.response?.results?.map((article: any, index: number) => ({
            id: `guardian-${index}`,
            title: article.webTitle,
            description: article.fields?.body?.substring(0, 200) + '...' || '',
            content: article.fields?.body || '',
            author: article.fields?.byline || 'Guardian Staff',
            publishedAt: article.webPublicationDate,
            url: article.webUrl,
            urlToImage: article.fields?.thumbnail,
            type: 'news',
            source: {name: 'The Guardian'}
        }));
    } catch (error) {
        console.error('Guardian API Error:', error);
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        // Try to fetch from real APIs first
        let articles = await fetchFromNewsAPI();

        if (!articles) {
            articles = await fetchFromGuardianAPI();
        }

        // If both APIs fail or no keys provided, use mock data
        if (!articles) {
            console.log('Using mock data - no API keys provided or APIs failed');
            articles = mockArticles;
        }

        return NextResponse.json({
            articles: articles || [],
            total: articles?.length || 0
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {error: 'Failed to fetch news', articles: mockArticles},
            {status: 500}
        );
    }
}