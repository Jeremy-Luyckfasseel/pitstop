import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

            <article className="mx-auto max-w-4xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/news">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Back to News
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        {newsItem.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={
                                        newsItem.author.avatar
                                            ? `/storage/${newsItem.author.avatar}`
                                            : undefined
                                    }
                                />
                                <AvatarFallback>
                                    {getInitials(newsItem.author.name)}
                                </AvatarFallback>
                            </Avatar>
                            <Link
                                href={`/profile/${newsItem.author.username}`}
                                className="hover:underline"
                            >
                                {newsItem.author.name}
                            </Link>
                        </div>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(newsItem.published_at)}
                        </span>
                    </div>
                </div>

                {newsItem.image_path && (
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={`/storage/${newsItem.image_path}`}
                            alt={newsItem.title}
                            className="w-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-lg leading-relaxed">
                        {newsItem.content}
                    </div>
                </div>

                <div className="border-t pt-6">
                    <Button variant="outline" asChild>
                        <Link href="/news">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to all news
                        </Link>
                    </Button>
                </div>
            </article>
        </AppLayout>
    );
}
