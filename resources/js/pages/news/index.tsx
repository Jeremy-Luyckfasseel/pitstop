import { Head, Link } from '@inertiajs/react';
import { Calendar, ChevronRight, Newspaper, User } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'News',
        href: '/news',
    },
];

interface Author {
    id: number;
    name: string;
    username: string;
}

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_path: string;
    published_at: string;
    author: Author;
}

interface PaginatedNewsItems {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function NewsIndex({
    newsItems,
}: {
    newsItems: PaginatedNewsItems;
}) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-10 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/20 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                    <div className="relative">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                            <Newspaper className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white">
                            Latest News
                        </h1>
                        <p className="mt-2 max-w-xl text-lg text-zinc-400">
                            Stay updated with breaking F1 news, race reports, and exclusive paddock stories.
                        </p>
                    </div>
                </div>

                {newsItems.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
                        <Newspaper className="mb-4 h-16 w-16 text-zinc-600" />
                        <p className="text-xl font-medium text-zinc-400">
                            No news articles available yet
                        </p>
                        <p className="mt-2 text-zinc-500">
                            Check back soon for the latest updates!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Featured Article (first item) */}
                        {newsItems.data[0] && (
                            <Link href={`/news/${newsItems.data[0].id}`} className="group mb-8 block">
                                <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/5">
                                    <div className="grid gap-0 lg:grid-cols-2">
                                        {newsItems.data[0].image_path && (
                                            <div className="aspect-video overflow-hidden lg:aspect-auto lg:h-80">
                                                <img
                                                    src={`/storage/${newsItems.data[0].image_path}`}
                                                    alt={newsItems.data[0].title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col justify-center p-8">
                                            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                                                FEATURED
                                            </div>
                                            <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-red-400 lg:text-3xl">
                                                {newsItems.data[0].title}
                                            </h2>
                                            <p className="mb-4 line-clamp-3 text-zinc-400">
                                                {newsItems.data[0].content}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-zinc-500">
                                                <span className="flex items-center gap-1.5">
                                                    <User className="h-4 w-4" />
                                                    {newsItems.data[0].author.name}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(newsItems.data[0].published_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Article Grid */}
                        {newsItems.data.length > 1 && (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {newsItems.data.slice(1).map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.id}`}
                                        className="group block"
                                    >
                                        <article className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900">
                                            {item.image_path && (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={`/storage/${item.image_path}`}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5">
                                                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-red-400">
                                                    {item.title}
                                                </h3>
                                                <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                    {item.content}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                                    <span>{item.author.name}</span>
                                                    <span>{formatDate(item.published_at)}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {newsItems.last_page > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-2">
                                {Array.from(
                                    { length: newsItems.last_page },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === newsItems.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        className={page === newsItems.current_page ? 'bg-red-600 hover:bg-red-500' : 'border-zinc-700 hover:bg-zinc-800'}
                                        asChild
                                    >
                                        <Link href={`/news?page=${page}`}>
                                            {page}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
