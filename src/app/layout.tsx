import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Admin Dashboard - News & Blog Management',
    description: 'A comprehensive admin dashboard for managing news articles and blog posts with analytics, payout management, and export features.',
    keywords: 'admin dashboard, news management, blog management, analytics, payout calculator',
    authors: [{name: 'Admin Dashboard Team'}],
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
