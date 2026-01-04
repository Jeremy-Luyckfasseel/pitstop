import { Head, Link, router } from '@inertiajs/react';
import { Edit, FolderOpen, Plus, Trash2 } from 'lucide-react';
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
    { title: 'FAQ Categories', href: '/admin/faq-categories' },
];

interface FaqCategory {
    id: number;
    name: string;
    order: number;
    faqs_count: number;
}

export default function AdminFaqCategoriesIndex({ categories }: { categories: FaqCategory[] }) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/faq-categories/${id}`, { onSuccess: () => setDeleteId(null) });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Categories" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-green-950/30 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/20">
                                <FolderOpen className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">FAQ Categories</h1>
                                <p className="text-zinc-400">{categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} to organize FAQs</p>
                            </div>
                        </div>
                        <Button asChild className="bg-green-600 hover:bg-green-500">
                            <Link href="/admin/faq-categories/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Link>
                        </Button>
                    </div>
                </div>

                {categories.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
                        <FolderOpen className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                        <p className="text-zinc-400">No categories yet. Create your first one!</p>
                        <Button asChild className="mt-4 bg-green-600 hover:bg-green-500">
                            <Link href="/admin/faq-categories/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <div key={category.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:bg-zinc-900">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <Badge className="bg-zinc-700 text-zinc-300">#{category.order}</Badge>
                                        <h3 className="mt-3 text-lg font-bold text-white">{category.name}</h3>
                                        <p className="mt-1 text-sm text-zinc-500">{category.faqs_count} question{category.faqs_count !== 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm" asChild className="flex-1 border-zinc-700 hover:bg-zinc-800">
                                        <Link href={`/admin/faq-categories/${category.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setDeleteId(category.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete this category?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. This will delete the category and all its FAQs.
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
