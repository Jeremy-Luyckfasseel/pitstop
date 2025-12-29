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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'FAQs',
        href: '/admin/faqs',
    },
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
        router.delete(`/admin/faqs/${id}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            FAQ Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage frequently asked questions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/admin/faq-categories">
                                Manage Categories
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/admin/faqs/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add FAQ
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All FAQs</CardTitle>
                        <CardDescription>
                            A list of all frequently asked questions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {faqs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <p className="text-muted-foreground">
                                    No FAQs yet. Create your first one!
                                </p>
                                <Button asChild className="mt-4">
                                    <Link href="/admin/faqs/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add FAQ
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Question</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="w-[100px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {faqs.map((faq) => (
                                        <TableRow key={faq.id}>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {faq.order}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="max-w-md">
                                                <p className="truncate font-medium">
                                                    {faq.question}
                                                </p>
                                                <p className="truncate text-sm text-muted-foreground">
                                                    {faq.answer.substring(
                                                        0,
                                                        100
                                                    )}
                                                    ...
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>
                                                    {faq.category.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/faqs/${faq.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteId(faq.id)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
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
                            delete this FAQ.
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
