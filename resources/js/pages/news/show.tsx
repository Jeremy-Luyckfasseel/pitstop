import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, Share2, Bookmark } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';

interface Author {
    id: number;
    name: string;
    username: string;
    avatar?: string;
}

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_path: string;
    published_at: string;
    author: Author;
}

export default function NewsShow({ newsItem }: { newsItem: NewsItem }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'News',
            href: '/news',
        },
        {
            title: newsItem.title.slice(0, 30) + (newsItem.title.length > 30 ? '...' : ''),
            href: `/news/${newsItem.id}`,
        },
    ];

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={newsItem.title} />

            <div className="p-6">
                <article className="mx-auto max-w-4xl">
                    {/* Back Button */}
                    <div className="mb-6">
                        <BackButton fallbackUrl="/news">Back to News</BackButton>
                    </div>

                    {/* Hero Image */}
                    {newsItem.image_path && (
                        <div className="relative mb-8 overflow-hidden rounded-2xl">
                            <img
                                src={`/storage/${newsItem.image_path}`}
                                alt={newsItem.title}
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        </div>
                    )}

                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                            NEWS
                        </div>
                        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
                            {newsItem.title}
                        </h1>

                        {/* Author and Date */}
                        <div className="flex flex-wrap items-center gap-6 border-b border-zinc-800 pb-6">
                            <Link
                                href={`/profile/${newsItem.author.username}`}
                                className="group flex items-center gap-3"
                            >
                                <Avatar className="h-12 w-12 border-2 border-zinc-700 transition-colors group-hover:border-red-500">
                                    <AvatarImage
                                        src={
                                            newsItem.author.avatar
                                                ? `/storage/${newsItem.author.avatar}`
                                                : undefined
                                        }
                                    />
                                    <AvatarFallback className="bg-zinc-800 text-white">
                                        {getInitials(newsItem.author.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-white transition-colors group-hover:text-red-400">
                                        {newsItem.author.name}
                                    </p>
                                    <p className="text-sm text-zinc-500">@{newsItem.author.username}</p>
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(newsItem.published_at)}</span>
                                <span className="text-zinc-600">•</span>
                                <span>{formatTime(newsItem.published_at)}</span>
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="mb-10">
                        <div className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-300">
                            {newsItem.content}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <footer className="border-t border-zinc-800 pt-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                <Link href="/news">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to all news
                                </Link>
                            </Button>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </footer>
                </article>
            </div>
        </AppLayout>
    );
}
