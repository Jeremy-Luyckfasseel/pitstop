import { Head, Link, router } from '@inertiajs/react';
import { Edit, Newspaper, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'News Management', href: '/admin/news' },
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

export default function AdminNewsIndex({ newsItems }: { newsItems: PaginatedNewsItems }) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/news/${id}`, { onSuccess: () => setDeleteId(null) });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const isPublished = (date: string) => new Date(date) <= new Date();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News Management" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                                <Newspaper className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">News Management</h1>
                                <p className="text-zinc-400">{newsItems.total} article{newsItems.total !== 1 ? 's' : ''} total</p>
                            </div>
                        </div>
                        <Button asChild className="bg-red-600 hover:bg-red-500">
                            <Link href="/admin/news/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Article
                            </Link>
                        </Button>
                    </div>
                </div>

                {newsItems.data.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
                        <Newspaper className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                        <p className="text-zinc-400">No news articles yet. Create your first one!</p>
                        <Button asChild className="mt-4 bg-red-600 hover:bg-red-500">
                            <Link href="/admin/news/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Article
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {newsItems.data.map((item) => (
                            <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-900">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex flex-1 gap-4">
                                        {item.image_path && (
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.title}
                                                className="h-20 w-20 rounded-lg object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold text-white">{item.title}</h3>
                                                {isPublished(item.published_at) ? (
                                                    <Badge className="bg-green-500/20 text-green-400">Published</Badge>
                                                ) : (
                                                    <Badge className="bg-amber-500/20 text-amber-400">Scheduled</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-500">By {item.author.name} • {formatDate(item.published_at)}</p>
                                            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{item.content.substring(0, 150)}...</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild className="border-zinc-700 hover:bg-zinc-800">
                                            <Link href={`/admin/news/${item.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setDeleteId(item.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {newsItems.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {Array.from({ length: newsItems.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === newsItems.current_page ? 'default' : 'outline'}
                                size="sm"
                                asChild
                                className={page === newsItems.current_page ? 'bg-red-600' : 'border-zinc-700'}
                            >
                                <Link href={`/admin/news?page=${page}`}>{page}</Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete this article?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. The article and its image will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-red-600 hover:bg-red-500">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
