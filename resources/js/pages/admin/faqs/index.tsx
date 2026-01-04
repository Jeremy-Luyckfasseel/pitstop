import { Head, Link, router } from '@inertiajs/react';
import { Edit, FolderOpen, HelpCircle, Plus, Trash2 } from 'lucide-react';
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
    { title: 'FAQs', href: '/admin/faqs' },
];

interface FaqCategory {
    id: number;
    name: string;
}

interface Faq {
    id: number;
    question: string;
    answer: string;
    order: number;
    category: FaqCategory;
}

export default function AdminFaqsIndex({ faqs }: { faqs: Faq[] }) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/faqs/${id}`, { onSuccess: () => setDeleteId(null) });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Management" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/30 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20">
                                <HelpCircle className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">FAQ Management</h1>
                                <p className="text-zinc-400">{faqs.length} question{faqs.length !== 1 ? 's' : ''} total</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                <Link href="/admin/faq-categories">
                                    <FolderOpen className="mr-2 h-4 w-4" />
                                    Categories
                                </Link>
                            </Button>
                            <Button asChild className="bg-amber-600 hover:bg-amber-500">
                                <Link href="/admin/faqs/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add FAQ
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {faqs.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
                        <HelpCircle className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                        <p className="text-zinc-400">No FAQs yet. Create your first one!</p>
                        <Button asChild className="mt-4 bg-amber-600 hover:bg-amber-500">
                            <Link href="/admin/faqs/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add FAQ
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-900">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge className="bg-zinc-700 text-zinc-300">#{faq.order}</Badge>
                                            <Badge className="bg-amber-500/20 text-amber-400">{faq.category.name}</Badge>
                                        </div>
                                        <h3 className="mt-2 font-bold text-white">{faq.question}</h3>
                                        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{faq.answer.substring(0, 150)}...</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" asChild className="border-zinc-700 hover:bg-zinc-800">
                                            <Link href={`/admin/faqs/${faq.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => setDeleteId(faq.id)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete this FAQ?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. This will permanently delete this FAQ.
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
