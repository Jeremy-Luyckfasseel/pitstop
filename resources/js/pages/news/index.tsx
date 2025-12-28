import { Head, Link } from '@inertiajs/react';
import { Calendar, User } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Latest News
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Stay updated with our latest articles
                    </p>
                </div>

                {newsItems.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-lg text-muted-foreground">
                                No news articles available yet. Check back
                                soon!
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {newsItems.data.map((item) => (
                                <Card
                                    key={item.id}
                                    className="overflow-hidden transition-shadow hover:shadow-lg"
                                >
                                    {item.image_path && (
                                        <Link href={`/news/${item.id}`}>
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={`/storage/${item.image_path}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                        </Link>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">
                                            <Link
                                                href={`/news/${item.id}`}
                                                className="hover:underline"
                                            >
                                                {item.title}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-4 text-xs">
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {item.author.name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(item.published_at)}
                                            </span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="line-clamp-3 text-sm text-muted-foreground">
                                            {item.content}
                                        </p>
                                        <Button
                                            variant="link"
                                            className="mt-2 p-0"
                                            asChild
                                        >
                                            <Link href={`/news/${item.id}`}>
                                                Read more →
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {newsItems.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                {Array.from(
                                    { length: newsItems.last_page },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <Button
                                        key={page}
                                        variant={
                                            page === newsItems.current_page
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
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
