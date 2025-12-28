import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'News Management',
        href: '/admin/news',
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
    created_at: string;
    user_id: number;
    author: Author;
}

interface PaginatedNewsItems {
    data: NewsItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function AdminNewsIndex({
    newsItems,
}: {
    newsItems: PaginatedNewsItems;
}) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/news/${id}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isPublished = (date: string) => {
        return new Date(date) <= new Date();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            News Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your news articles
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/news/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create News
                        </Link>
                    </Button>
                </div>

                {newsItems.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">
                                No news articles yet. Create your first one!
                            </p>
                            <Button asChild className="mt-4">
                                <Link href="/admin/news/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create News
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {newsItems.data.map((item) => (
                            <Card key={item.id}>
                                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CardTitle>{item.title}</CardTitle>
                                            {isPublished(item.published_at) ? (
                                                <Badge variant="default">
                                                    Published
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Scheduled
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription>
                                            By {item.author.name} •{' '}
                                            {formatDate(item.published_at)}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={`/admin/news/${item.id}/edit`}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDeleteId(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4">
                                        {item.image_path && (
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="h-24 w-24 rounded-lg object-cover"
                                            />
                                        )}
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {item.content.substring(0, 200)}...
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

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
                                <Link href={`/admin/news?page=${page}`}>
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this news article and its associated image.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
